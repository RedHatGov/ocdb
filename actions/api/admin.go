package api

import (
	"github.com/RedHatGov/ocdb/actions/jobs"
	"github.com/gobuffalo/buffalo"
)

type JobsResource struct {
	buffalo.Resource
}

func (v JobsResource) List(c buffalo.Context) error {
	return c.Render(200, r.JSON(jobs.List))
}
