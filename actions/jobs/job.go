package jobs

import (
	"github.com/RedHatGov/ocdb/pkg/utils"
	"github.com/gobuffalo/buffalo/worker"
	"time"
)

type JobFn func() error

type Job struct {
	Name string
	Fn   JobFn `json:"-"`
}

func (job *Job) setUpIn(w worker.Worker) {
	err := w.Register(job.Name, func(args worker.Args) error {
		job.reschedule(w, time.Hour)
		return job.Fn()
	})
	if err != nil {
		utils.Log.Fatalf("Could not register job: %v", err)
	}
	job.reschedule(w, time.Minute)
}

func (job *Job) reschedule(w worker.Worker, period time.Duration) {
	err := w.PerformIn(worker.Job{
		Queue:   "masonry",
		Handler: job.Name,
	}, period)
	if err != nil {
		utils.Log.Errorf("Could not reschedule job %s: %v", job.Name, err)
	}
}
