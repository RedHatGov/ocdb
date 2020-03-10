package jobs

import (
	"github.com/RedHatGov/ocdb/pkg/cac"
	"github.com/RedHatGov/ocdb/pkg/masonry"
	"github.com/gobuffalo/buffalo/worker"
	"time"
)

type JobFn func() error

func Init(w worker.Worker) {
	setUpJob(w, "refresh_masonry", masonry.Refresh)
	setUpJob(w, "refresh_cac", cac.Refresh)
}

func setUpJob(w worker.Worker, name string, job JobFn) {
	w.Register(name, func(args worker.Args) error {
		rescheduleJob(w, name, time.Hour)
		return job()
	})
	rescheduleJob(w, name, time.Minute)
}

func rescheduleJob(w worker.Worker, handlerName string, period time.Duration) {
	w.PerformIn(worker.Job{
		Queue:   "masonry",
		Handler: handlerName,
	}, period)

}
