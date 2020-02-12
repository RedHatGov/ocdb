package actions

import (
	"github.com/RedHatGov/ocdb/pkg/masonry"
	"github.com/gobuffalo/buffalo/worker"
	"time"
)

func init() {
	w := App().Worker
	w.Register("refresh_masonry", func(args worker.Args) error {
		ScheduleRefresh()
		masonry.Refresh()
		return nil
	})
	ScheduleRefresh()
}

func ScheduleRefresh() {
	w := App().Worker
	w.PerformIn(worker.Job{
		Queue:   "masonry",
		Handler: "refresh_masonry",
	}, time.Hour)

}
