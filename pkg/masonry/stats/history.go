package stats

import (
	"github.com/RedHatGov/ocdb/pkg/git"
	"github.com/RedHatGov/ocdb/pkg/masonry"
	"github.com/opencontrol/compliance-masonry/pkg/lib/common"
	"sync"
	"time"
)

const (
	// how many months back we want to in the statistics?
	startingYear  = 2020
	startingMonth = 01
	ocGit         = "https://github.com/ComplianceAsCode/redhat"
	ocDir         = "/tmp/.ComplianceAsCode.redhat"
)

type HistoricalStats map[string]ComponentStats

type ComponentStats map[string]CertificationStats

type CertificationStats struct {
	Certification string
	History       []ResultSnapshot
	PerFamily     map[string]ControlResponses
}

type ResultSnapshot struct {
	Time  time.Time
	Stats ControlResponses
}

type ControlResponses map[string]int

var hsInstance *HistoricalStats
var hsMux sync.Mutex

func getHistoricalStats() *HistoricalStats {
	if hsInstance == nil {
		RefreshHistoryStatistics()
	}
	return hsInstance
}

func GetHistoricalStats(componentID string) (ComponentStats, bool) {
	instance := getHistoricalStats()
	stats, found := (*instance)[componentID]
	return stats, found
}

func RefreshHistoryStatistics() error {
	hsMux.Lock()
	defer hsMux.Unlock()

	startDate := time.Date(startingYear, time.Month(startingMonth), 1, 0, 0, 0, 0, time.UTC)
	res, err := buildHistoricalStats(startDate)
	if err != nil {
		return err
	}
	hsInstance = &res
	return nil
}

func buildHistoricalStats(startDate time.Time) (HistoricalStats, error) {
	res := HistoricalStats{}
	gitStartDate := startDate.AddDate(0, -1, 0)
	err := git.PullOrClone(ocDir, ocGit, &(gitStartDate))
	if err != nil {
		return res, err
	}

	for date := range generateDatesBiMonthly(startDate) {
		oc, err := opencontrolsByDate(ocDir, date)
		if err != nil {
			return res, err
		}

		for _, component := range oc.GetAllComponents() {
			res.AddData(date, oc.GetAllCertifications(), component)
		}
	}
	return res, nil
}

func (stats HistoricalStats) AddData(date time.Time, certifications map[string]masonry.Certification, component common.Component) {
	_, found := stats[component.GetKey()]
	if !found {
		stats[component.GetKey()] = ComponentStats{}
	}
	stats[component.GetKey()].AddData(date, certifications, component)
}

func (stats ComponentStats) AddData(date time.Time, certifications map[string]masonry.Certification, component common.Component) {
	satisfiesMap := map[string]string{}
	for _, sat := range component.GetAllSatisfies() {
		satisfiesMap[sat.GetControlKey()] = sat.GetImplementationStatus()
	}

	for _, cert := range certifications {
		_, found := stats[cert.Key]
		if !found {
			stats[cert.Key] = CertificationStats{Certification: cert.Key, History: []ResultSnapshot{}}
		}
		cs := stats[cert.Key]
		cs.History = append(cs.History, resultSnapshot(date, cert, satisfiesMap))
		cs.buildPerFamilyStats(cert, satisfiesMap)
		stats[cert.Key] = cs
	}
}

func (stats *CertificationStats) buildPerFamilyStats(cert masonry.Certification, satisfiesMap map[string]string) {
	stats.PerFamily = map[string]ControlResponses{}
	for standardName, subSet := range cert.Controls {
		if standardName == "NIST-800-53" {
			for ctrlID := range subSet {
				family := ctrlID[0:2]
				_, found := stats.PerFamily[family]
				if !found {
					stats.PerFamily[family] = ControlResponses{}
				}

				stats.PerFamily[family].AddData(ctrlID, satisfiesMap)
			}
		}
	}
}

func resultSnapshot(date time.Time, cert masonry.Certification, satisfiesMap map[string]string) ResultSnapshot {
	res := ResultSnapshot{Time: date, Stats: ControlResponses{}}
	for standardName, subSet := range cert.Controls {
		if standardName == "NIST-800-53" {
			for ctrlID := range subSet {
				res.Stats.AddData(ctrlID, satisfiesMap)
			}
		}
	}
	return res
}

func (responses ControlResponses) AddData(ctrlID string, satisfiesMap map[string]string) {
	status, found := satisfiesMap[ctrlID]
	if !found {
		status = "unknown"
	}
	prev, found := responses[status]
	if !found {
		prev = 0
	}
	responses[status] = prev + 1
}

func opencontrolsByDate(ocDir string, date time.Time) (*masonry.OpencontrolData, error) {
	gitSha, err := git.LastCommitBy(ocDir, date)
	if err != nil {
		return nil, err
	}
	return masonry.NewOpencontrolData(gitSha, "/tmp/.ComplianceAsCode.redhat.rev")
}

func generateDatesBiMonthly(since time.Time) chan time.Time {
	today := time.Now()
	ch := make(chan time.Time)
	go func() {
		for date := since; today.After(date); date = date.AddDate(0, 2, 0) {
			ch <- date
		}
		ch <- today
		close(ch)
	}()
	return ch
}
