package api

import (
	"github.com/gobuffalo/buffalo"
	"github.com/isimluk/ocdb/pkg/masonry"
	"github.com/opencontrol/compliance-masonry/pkg/lib/common"
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
	component, found := (*ms).GetComponent(c.Param("component_id"))
	if found {
		return c.Render(200, r.JSON(component))
	}
	return c.Render(404, r.JSON("Not found"))
}

type CustomControl struct {
	Key     string
	Control common.Control
}

func standardToLogicalView(s common.Standard) map[string][]CustomControl {
	result := make(map[string][]CustomControl)
	controls := s.GetControls()
	for _, controlName := range s.GetSortedControls() {
		control := controls[controlName]
		_, ok := result[control.GetFamily()]
		if !ok {
			result[control.GetFamily()] = make([]CustomControl, 0)
		}
		result[control.GetFamily()] = append(result[control.GetFamily()], CustomControl{
			Key:     controlName,
			Control: control})
	}
	return result
}

func logicalView(ms *common.Workspace, c common.Component) map[string]interface{} {
	result := make(map[string]interface{})

	for _, implementation := range c.GetAllSatisfies() {
		standardKey := implementation.GetStandardKey()
		_, ok := result[standardKey]
		if !ok {
			standard, found := (*ms).GetStandard(standardKey)
			if found {
				result[standardKey] = standardToLogicalView(standard)
			}

		}
	}

	return result
}

// ComponentControlsHandler gives logical human readable view of open control items available.
func ComponentControlsHandler(c buffalo.Context) error {
	ms := masonry.GetInstance()
	component, found := (*ms).GetComponent(c.Param("component_id"))
	if found {
		r.JSON(component)
		return c.Render(200, r.JSON(logicalView(ms, component)))
	}
	return c.Render(404, r.JSON("Not found"))
}
