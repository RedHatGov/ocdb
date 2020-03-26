package masonry

import (
	"fmt"
	//"github.com/opencontrol/compliance-masonry/pkg/lib/common"
	"time"
)

const (
	// how many months back we want to in the statistics?
	startingYear  = 2019
	startingMonth = 12
)

type HistoricalStats struct {
	Snapshots []SnapshotStats
}

type SnapshotStats struct {
	time.Time
	Components map[string]ComponentStatistics
}

func RefreshHistoryStatistics() error {
	genTimeSeries()
	return nil
}

func genTimeSeries() {
	for date := range generateDatesMonthly(startingMonth, startingYear) {
		fmt.Println(date)
	}
}

func generateDatesMonthly(startingMonth, startingYear int) chan time.Time {
	today := time.Now()
	ch := make(chan time.Time)
	go func() {
		for date := time.Date(startingYear, time.Month(startingMonth), 1, 0, 0, 0, 0, time.UTC); today.After(date); date = date.AddDate(0, 1, 0) {
			ch <- date
		}
		close(ch)
	}()
	return ch
}
