package masonry

import (
	"github.com/RedHatGov/ocdb/pkg/git"
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

type ComponentStats []ComponentSnapshotStats

type ComponentSnapshotStats struct {
	Time  time.Time
	Stats ComponentStatistics
}

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
	gitStartDate := startDate.AddDate(0, -1, 0)
	err := git.PullOrClone(ocDir, ocGit, &(gitStartDate))
	if err != nil {
		return err
	}
	res := HistoricalStats{}
	for date := range generateDatesMonthly(startDate) {
		sha, err := git.LastCommitBy(ocDir, date)
		if err != nil {
			return err
		}
		snapshots, err := newSnapshotStats(date, sha)
		if err != nil {
			return err
		}
		for componentID, snapshot := range snapshots {
			_, found := res[componentID]
			if !found {
				res[componentID] = ComponentStats{}
			}
			res[componentID] = append(res[componentID], snapshot)
		}
	}
	hsInstance = &res
	return nil
}

func newSnapshotStats(date time.Time, gitSha string) (map[string]ComponentSnapshotStats, error) {
	res := map[string]ComponentSnapshotStats{}
	oc, err := newOpencontrolData(gitSha, "/tmp/.ComplianceAsCode.content.rev")
	if err != nil {
		return nil, err
	}
	for _, component := range oc.GetAllComponents() {
		res[component.GetKey()] = ComponentSnapshotStats{
			Time:  date,
			Stats: oc.ComponentStatistics(component),
		}
	}

	return res, nil
}

func generateDatesMonthly(since time.Time) chan time.Time {
	today := time.Now()
	ch := make(chan time.Time)
	go func() {
		for date := since; today.After(date); date = date.AddDate(0, 1, 0) {
			ch <- date
		}
		close(ch)
	}()
	return ch
}
