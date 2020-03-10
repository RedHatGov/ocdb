package jobs

import (
	"github.com/RedHatGov/ocdb/pkg/cac"
	"github.com/RedHatGov/ocdb/pkg/masonry"
	"github.com/gobuffalo/buffalo/worker"
)

var schedule = []Job{
	Job{
		Name: "refresh_masonry",
		Fn:   masonry.Refresh,
	},
	Job{
		Name: "refresh_cac",
		Fn:   cac.Refresh,
	},
}

func Init(worker worker.Worker) {
	for _, job := range schedule {
		job.setUpIn(worker)
	}
}
