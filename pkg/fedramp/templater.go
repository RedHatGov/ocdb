package fedramp

import (
	"github.com/RedHatGov/ocdb/pkg/masonry"
	"github.com/opencontrol/fedramp-templater/opencontrols"
	"github.com/opencontrol/fedramp-templater/ssp"
	"github.com/opencontrol/fedramp-templater/templater"
	"os"
)

const masonryPath = "/tmp/.masonry_cache/"
const fedrampPath = "/tmp/.fedramp_cache/"
const fedrampDocPath = "/tmp/.fedramp_cache/fedramp.docx"
const sspDocTemplate = "assets/FedRAMP-System-Security-Plan-Template-v2.1.docx"

type FedrampDocument struct {
	Bytes  string
	Errors []error
}

func buildCache() *map[string]FedrampDocument {
	ms := masonry.GetInstance()
	result := make(map[string]FedrampDocument)
	for _, component := range (*ms).GetAllComponents() {
		bytes, errors := buildFor(component.GetKey())
		result[component.GetKey()] = FedrampDocument{bytes, errors}
	}
	return &result
}

// Get the fedramp document for given component
func buildFor(componentId string) (string, []error) {
	err := os.RemoveAll(fedrampPath)
	if err != nil {
		return "", []error{err}
	}
	err = os.MkdirAll(fedrampPath+"/components/"+componentId+"/", 0700)
	if err != nil {
		return "", []error{err}
	}
	err = os.MkdirAll(fedrampPath+"/standards", 0700)
	if err != nil {
		return "", []error{err}
	}
	err = os.Symlink(masonryPath+"/components/"+componentId+"/component.yaml", fedrampPath+"/components/"+componentId+"/component.yaml")
	if err != nil {
		return "", []error{err}
	}

	openControlData, errors := opencontrols.LoadFrom(fedrampPath)
	if len(errors) != 0 {
		return "", errors
	}
	doc, err := ssp.Load(sspDocTemplate)
	if err != nil {
		return "", []error{err}
	}
	defer doc.Close()

	err = templater.TemplatizeSSP(doc, openControlData)
	if err != nil {
		return "", []error{err}
	}
	return doc.Content(), nil
	// outputDir := filepath.Dir(fedrampDocPath)
	// err = os.MkdirAll(outputDir, 0700)
	// if err != nil {
	// return []error{err}
	// }
	// err = doc.CopyTo(fedrampDocPath)
	// if err != nil {
	// return []error{err}
	// }
	// return nil
}
