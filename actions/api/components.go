package api

import (
	"bytes"
	"github.com/RedHatGov/ocdb/pkg/fedramp"
	"github.com/RedHatGov/ocdb/pkg/masonry"
	"github.com/gobuffalo/buffalo"
)

// ComponentsResource show components like defined by opencontrols
type ComponentsResource struct {
	buffalo.Resource
}

// List default implementation.
func (v ComponentsResource) List(c buffalo.Context) error {
	ms := masonry.GetInstance()
	return c.Render(200, r.JSON(ms.GetAllComponents()))
}

// Show default implementation.
func (v ComponentsResource) Show(c buffalo.Context) error {
	ms := masonry.GetInstance()
	component, found := ms.GetComponent(c.Param("component_id"))
	if found {
		return c.Render(200, r.JSON(component))
	}
	return c.Render(404, r.JSON("Not found"))
}

// ComponentControlsHandler gives logical human readable view of open control items available.
func ComponentControlsHandler(c buffalo.Context) error {
	ms := masonry.GetInstance()
	component, found := ms.GetComponent(c.Param("component_id"))
	if found {
		lv, problems := ms.ComponentLogicalView(component)
		result := make(map[string]interface{})
		result["name"] = component.GetName()
		result["controls"] = lv
		result["errors"] = problems

		return c.Render(200, r.JSON(result))
	}
	return c.Render(404, r.JSON("Not found"))
}

// ComponentFedrampHandler returns fedramp DOCX template filled in with current components info
func ComponentFedrampHandler(c buffalo.Context) error {
	fedrampLevel := c.Param("level")
	if fedrampLevel != "High" && fedrampLevel != "Moderate" && fedrampLevel != "Low" {
		return c.Render(404, r.JSON("Unknown level specified "+fedrampLevel+
			". Please use High, Moderate, or Low"))
	}

	document := fedramp.Get(c.Param("component_id"), fedrampLevel)
	if document != nil {
		if len(document.Bytes) > 0 {
			return c.Render(200,
				r.Download(c,
					"FedRAMP-"+fedrampLevel+"-"+c.Param("component_id")+".docx",
					bytes.NewReader(document.Bytes)))
		}

		strErrors := make([]string, len(document.Errors))
		for i, err := range document.Errors {
			strErrors[i] = err.Error()
		}
		return c.Render(404, r.JSON(strErrors))

	}
	return c.Render(404, r.JSON("Not found"))
}
