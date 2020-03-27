package masonry

import (
	"fmt"
	//"github.com/opencontrol/compliance-masonry/pkg/lib/common"
	"github.com/RedHatGov/ocdb/pkg/git"
	"time"
)

const (
	// how many months back we want to in the statistics?
	startingYear  = 2019
	startingMonth = 12
	ocGit         = "https://github.com/ComplianceAsCode/redhat"
	ocDir         = "/tmp/.ComplianceAsCode.redhat"
)

type HistoricalStats struct {
	Snapshots []SnapshotStats
}

type SnapshotStats struct {
	time.Time
	Components map[string]ComponentStatistics
}

func RefreshHistoryStatistics() error {
	startDate := time.Date(startingYear, time.Month(startingMonth), 1, 0, 0, 0, 0, time.UTC)
	gitStartDate := startDate.AddDate(0, -1, 0)
	err := git.PullOrClone(ocDir, ocGit, &(gitStartDate))
	if err != nil {
		return err
	}
	for date := range generateDatesMonthly(startDate) {
		sha, err := git.LastCommitBy(ocDir, date)
		if err != nil {
			return err
		}
		fmt.Print(sha)
	}
	return nil
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
