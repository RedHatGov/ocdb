package api

import (
	"github.com/gobuffalo/buffalo"
	"github.com/isimluk/ocdb/pkg/masonry"
)

// StandardsResource show standards like defined by opencontrols
type StandardsResource struct {
	buffalo.Resource
}

// List default implementation.
func (v StandardsResource) List(c buffalo.Context) error {
	ms := masonry.GetInstance()
	return c.Render(200, r.JSON((*ms).GetAllStandards()))
}

// Show default implementation.
func (v StandardsResource) Show(c buffalo.Context) error {
	ms := masonry.GetInstance()
	standardID := c.Param("standard_id")
	for _, s := range (*ms).GetAllStandards() {
		if s.GetName() == standardID {
			return c.Render(200, r.JSON(s))
		}
	}
	return c.Render(404, r.JSON("Not found"))
}
