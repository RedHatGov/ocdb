package jobs

import (
	"github.com/RedHatGov/ocdb/pkg/cac"
	"github.com/RedHatGov/ocdb/pkg/masonry"
	"github.com/gobuffalo/buffalo/worker"
	"time"
)

var List = []Job{
	Job{
		Name:   "Open Control Masonry Refresh",
		Fn:     masonry.Refresh,
		Period: time.Hour,
	},
	Job{
		Name:   "ComplianceAsCode Rebuild",
		Fn:     cac.Refresh,
		Period: time.Hour,
	},
}

func Init(worker worker.Worker) {
	for i, _ := range List {
		job := &(List[i])
		job.setUpIn(worker)
	}
}
