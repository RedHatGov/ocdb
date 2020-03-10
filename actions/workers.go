package actions

import (
	"github.com/RedHatGov/ocdb/actions/jobs"
)

func init() {
	w := App().Worker
	jobs.Init(w)
}
