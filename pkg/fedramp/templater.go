package fedramp

import (
	"errors"
	"github.com/RedHatGov/ocdb/pkg/masonry"
	"github.com/RedHatGov/ocdb/pkg/static"
	"github.com/opencontrol/fedramp-templater/opencontrols"
	"github.com/opencontrol/fedramp-templater/ssp"
	"github.com/opencontrol/fedramp-templater/templater"
	"io/ioutil"
	"os"
	"path/filepath"
)

const masonryPath = "/tmp/.masonry_cache/"
const fedrampPath = "/tmp/.fedramp_cache/"
const fedrampDocPath = "/tmp/.fedramp_cache/fedramp.docx"

type FedrampDocument struct {
	Bytes  []byte
	Errors []error
}

type FedrampGuidance map[string]FedrampDocument

type FedrampCache struct {
	cache map[string]FedrampGuidance
}

func newFedrampCache() *FedrampCache {
	ms := masonry.GetInstance()
	result := FedrampCache{cache: make(map[string]FedrampGuidance)}
	for _, component := range (*ms).GetAllComponents() {
		result.cache[component.GetKey()] = make(FedrampGuidance)
	}
	return &result
}

func (c *FedrampCache) get(componentId string, fedrampLevel string) *FedrampDocument {
	guidance := c.cache[componentId]
	doc, ok := guidance[fedrampLevel]
	if !ok {
		bytes, errors := buildFor(componentId, fedrampLevel)
		doc = FedrampDocument{bytes, errors}
		guidance[fedrampLevel] = doc
	}
	return &doc
}

func fedrampTemplate(fedrampLevel string) (*ssp.Document, []error) {
	file := "FedRAMP-SSP-" + fedrampLevel + "-Baseline-Template.docx"
	path := "assets/fedramp_templates/" + file

	docBytes, err := static.AssetsBox.Find(path)
	if err != nil {
		return nil, []error{err, errors.New("Assets pack does not contain FEDRAMP template: " + path)}
	}
	ioutil.WriteFile("/tmp/"+file, docBytes, 0600)

	doc, err := ssp.Load("/tmp/" + file)
	if err != nil {
		return nil, []error{err, errors.New("Could not open FEDRAMP template: /tmp/" + file)}
	}
	return doc, nil
}

// Get the fedramp document for given component
func buildFor(componentId string, fedramLevel string) ([]byte, []error) {
	err := os.RemoveAll(fedrampPath)
	if err != nil {
		return nil, []error{err}
	}
	err = os.MkdirAll(fedrampPath+"/components/"+componentId+"/", 0700)
	if err != nil {
		return nil, []error{err}
	}
	err = os.MkdirAll(fedrampPath+"/standards", 0700)
	if err != nil {
		return nil, []error{err}
	}
	err = os.Symlink(masonryPath+"/components/"+componentId+"/component.yaml", fedrampPath+"/components/"+componentId+"/component.yaml")
	if err != nil {
		return nil, []error{err}
	}

	openControlData, errs := opencontrols.LoadFrom(fedrampPath)
	if len(errs) != 0 {
		return nil, errs
	}
	doc, errs := fedrampTemplate(fedramLevel)
	if len(errs) != 0 {
		return nil, errs
	}
	defer doc.Close()

	err = templater.TemplatizeSSP(doc, openControlData)
	if err != nil {
		return nil, []error{err}
	}

	outputDir := filepath.Dir(fedrampDocPath)
	err = os.MkdirAll(outputDir, 0700)
	if err != nil {
		return nil, []error{err}
	}
	err = doc.CopyTo(fedrampDocPath)
	if err != nil {
		return nil, []error{err}
	}

	data, err := ioutil.ReadFile(fedrampDocPath)
	if err != nil {
		return nil, []error{err}
	}

	return data, nil
}
