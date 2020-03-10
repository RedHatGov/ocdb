package jobs

import (
	"github.com/RedHatGov/ocdb/pkg/utils"
	"github.com/gobuffalo/buffalo/worker"
	"time"
)

type JobFn func() error

type Job struct {
	Name string
	Fn   JobFn
}

func setUpJob(w worker.Worker, name string, job JobFn) {
	err := w.Register(name, func(args worker.Args) error {
		rescheduleJob(w, name, time.Hour)
		return job()
	})
	if err != nil {
		utils.Log.Fatalf("Could not register job: %v", err)
	}
	rescheduleJob(w, name, time.Minute)
}

func rescheduleJob(w worker.Worker, handlerName string, period time.Duration) {
	err := w.PerformIn(worker.Job{
		Queue:   "masonry",
		Handler: handlerName,
	}, period)
	if err != nil {
		utils.Log.Errorf("Could not reschedule job: %v", err)
	}
}
