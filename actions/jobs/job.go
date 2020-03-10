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

func (job *Job) setUpIn(w worker.Worker) {
	err := w.Register(job.Name, func(args worker.Args) error {
		rescheduleJob(w, job.Name, time.Hour)
		return job.Fn()
	})
	if err != nil {
		utils.Log.Fatalf("Could not register job: %v", err)
	}
	rescheduleJob(w, job.Name, time.Minute)
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
