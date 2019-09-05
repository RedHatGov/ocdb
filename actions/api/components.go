package api

import (
	"github.com/gobuffalo/buffalo"
	"github.com/isimluk/ocdb/pkg/masonry"
)

// ComponentsResource show components like defined by opencontrols
type ComponentsResource struct {
	buffalo.Resource
}

// List default implementation.
func (v ComponentsResource) List(c buffalo.Context) error {
	ms := masonry.GetInstance()
	return c.Render(200, r.JSON((*ms).GetAllComponents()))
}

// Show default implementation.
func (v ComponentsResource) Show(c buffalo.Context) error {
	ms := masonry.GetInstance()
	component, found := (*ms).GetStandard(c.Param("component_id"))
	if found {
		return c.Render(200, r.JSON(component))
	}
	return c.Render(404, r.JSON("Not found"))
}
