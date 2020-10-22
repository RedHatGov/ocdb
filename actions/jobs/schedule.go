package jobs

import (
	"github.com/RedHatGov/ocdb/pkg/backend/job"
	"github.com/RedHatGov/ocdb/pkg/cac"
	"github.com/RedHatGov/ocdb/pkg/cac_oscal"
	"github.com/RedHatGov/ocdb/pkg/masonry"
	"github.com/RedHatGov/ocdb/pkg/masonry/stats"
	"github.com/gobuffalo/buffalo/worker"
	"time"
)

var List = []job.Job{
	job.Job{
		Name:   "Open Control Masonry Refresh",
		Fn:     masonry.Refresh,
		Period: time.Hour,
	},
	job.Job{
		Name:   "ComplianceAsCode Rebuild",
		Fn:     cac.Refresh,
		Period: time.Hour,
	},
	job.Job{
		Name:   "Open Control Historical Statistics",
		Fn:     stats.RefreshHistoryStatistics,
		Period: time.Hour * 24,
	},
	job.Job{
		Name:         "Refresh OSCAL resources and Rebuild DOCX templates",
		Fn:           cac_oscal.Refresh,
		Period:       time.Hour * 24,
		DelayedStart: 15 * time.Minute,
	},
}

func Init(worker worker.Worker) {
	for i, _ := range List {
		j := &(List[i])
		j.SetUpIn(worker)
	}
}
