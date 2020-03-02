package actions

import (
	"github.com/RedHatGov/ocdb/pkg/masonry"
	"github.com/gobuffalo/buffalo/worker"
	"time"
)

func init() {
	w := App().Worker
	w.Register("refresh_masonry", func(args worker.Args) error {
		RescheduleJob("refresh_masonry")
		masonry.Refresh()
		return nil
	})
	RescheduleJob("refresh_masonry")
}

func RescheduleJob(handlerName string) {
	w := App().Worker
	w.PerformIn(worker.Job{
		Queue:   "masonry",
		Handler: handlerName,
	}, time.Hour)

}
