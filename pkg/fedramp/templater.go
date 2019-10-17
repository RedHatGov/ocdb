package fedramp

import (
	"github.com/opencontrol/fedramp-templater/opencontrols"
	"github.com/opencontrol/fedramp-templater/ssp"
	"github.com/opencontrol/fedramp-templater/templater"
	"os"
	"path/filepath"
)

const masonryPath = "/tmp/.masonry_cache/"
const fedrampPath = "/tmp/.fedramp_cache/"
const fedrampDocPath = "/tmp/.fedramp_cache/fedramp.docx"
const sspDocTemplate = "assets/FedRAMP-System-Security-Plan-Template-v2.1.docx"

// Get the fedramp document for given component
func Get(componentId string) []error {
	err := os.RemoveAll(fedrampPath)
	if err != nil {
		return []error{err}
	}
	err = os.MkdirAll(fedrampPath+"/components/"+componentId+"/", 0700)
	if err != nil {
		return []error{err}
	}
	err = os.MkdirAll(fedrampPath+"/standards", 0700)
	if err != nil {
		return []error{err}
	}
	err = os.Symlink(masonryPath+"/components/"+componentId+"/component.yaml", fedrampPath+"/components/"+componentId+"/component.yaml")
	if err != nil {
		return []error{err}
	}

	openControlData, errors := opencontrols.LoadFrom(fedrampPath)
	if len(errors) != 0 {
		return errors
	}
	doc, err := ssp.Load(sspDocTemplate)
	if err != nil {
		return []error{err}
	}
	defer doc.Close()

	err = templater.TemplatizeSSP(doc, openControlData)
	if err != nil {
		return []error{err}
	}

	outputDir := filepath.Dir(fedrampDocPath)
	err = os.MkdirAll(outputDir, 0700)
	if err != nil {
		return []error{err}
	}

	err = doc.CopyTo(fedrampDocPath)
	if err != nil {
		return []error{err}
	}

	return nil
}
