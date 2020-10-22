package api

import (
	"fmt"
	"github.com/RedHatGov/ocdb/actions/jobs"
	"github.com/gobuffalo/buffalo"
)

type JobsResource struct {
	buffalo.Resource
}

func (v JobsResource) List(c buffalo.Context) error {
	return c.Render(200, r.JSON(jobs.List))
}

func ReadinessHandler(c buffalo.Context) error {
	for _, j := range jobs.List {
		if j.LastSuccess.IsZero() && j.DelayedStart != 0 {
			return c.Render(500, r.JSON(fmt.Sprintf("Waiting for unfinished job: %s", j.Name)))
		}
	}

	return c.Render(200, r.JSON("All jobs succeeded"))
}
