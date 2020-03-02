package actions

import (
	"github.com/RedHatGov/ocdb/pkg/masonry"
	"github.com/gobuffalo/buffalo/worker"
	"time"
)

type Job func()

func init() {
	w := App().Worker
	SetUpJob(w, "refresh_masonry", masonry.Refresh)
}

func SetUpJob(w worker.Worker, name string, job Job) {
	w.Register(name, func(args worker.Args) error {
		RescheduleJob(name)
		job()
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
