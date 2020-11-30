package api

import (
	"strings"

	"github.com/RedHatGov/ocdb/pkg/cac_oscal"
	"github.com/RedHatGov/ocdb/pkg/masonry"
	"github.com/RedHatGov/ocdb/pkg/masonry/stats"
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
		return c.Render(200, r.JSON(ms.ComponentLogicalView(component)))
	}
	return c.Render(404, r.JSON("Not found"))
}

// ComponentStatisticsHandler gives overview of component completion statistics over time
func ComponentStatisticsHandler(c buffalo.Context) error {
	stats, found := stats.GetHistoricalStats(c.Param("component_id"))
	if found {
		return c.Render(200, r.JSON(stats))
	}
	return c.Render(404, r.JSON("Not found"))
}

// ComponentFedrampOscalHandler returns OSCAL documents for given fedramp
func ComponentFedrampOscalHandler(c buffalo.Context) error {
	fedrampFormat := strings.ToLower(c.Param("format"))
	if fedrampFormat != "xml" && fedrampFormat != "docx" && fedrampFormat != "json" {
		return c.Render(404, r.JSON("Unknown oscal format specified "+fedrampFormat+
			". Please use 'xml', 'json', or 'docx' instead."))
	}
	fedrampLevel := c.Param("level")
	if fedrampLevel != "High" && fedrampLevel != "Moderate" && fedrampLevel != "Low" {
		return c.Render(404, r.JSON("Unknown level specified "+fedrampLevel+
			". Please use High, Moderate, or Low"))
	}
	document, err := cac_oscal.FedrampDocument(c.Param("component_id"), fedrampLevel, fedrampFormat)
	if err != nil {
		return c.Render(404, r.JSON(err.Error()))
	}
	defer document.Close()
	return c.Render(200,
		r.Download(c, "FedRAMP-"+fedrampLevel+"-"+c.Param("component_id")+"."+fedrampFormat,
			document))
}
