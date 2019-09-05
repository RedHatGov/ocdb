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

// show default implementation.
func (v StandardsResource) show(c buffalo.Context) error {
	return c.Render(200, r.String("Standard#show"))
}
