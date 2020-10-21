package cac_oscal

import (
	"fmt"
	"os"
	"sync"

	"github.com/RedHatGov/ocdb/pkg/git"
	"github.com/RedHatGov/ocdb/pkg/masonry"
	"github.com/gocomply/fedramp/pkg/templater"
)

var mux sync.Mutex

const (
	gitCache  = "/var/tmp/.ComplianceAsCode.oscal"
	docxCache = "/var/tmp/.docx_cache"
)

// Refresh function refreshes masonry data
func Refresh() error {
	mux.Lock()
	defer mux.Unlock()
	err := git.PullOrClone(gitCache, "https://github.com/ComplianceAsCode/oscal", nil)
	if err != nil {
		return err
	}
	return buildDocxs()
}

func buildDocxs() error {
	err := os.MkdirAll(docxCache, os.FileMode(0722))
	if err != nil {
		return err
	}

	for componentId := range knownComponents() {
		for _, level := range []string{"Low", "Moderate", "High"} {
			oscalPath := fmt.Sprintf("%s/xml/%s-fedramp-%s.xml", gitCache, componentId, level)
			docxPath := fmt.Sprintf("%s/FedRAMP-%s-%s.docx", docxCache, level, componentId)
			err := templater.ConvertFile(oscalPath, docxPath)
			if err != nil {
				return err
			}
		}

	}
	return nil
}

func knownComponents() <-chan string {
	out := make(chan string)

	go func() {
		ms := masonry.GetInstance()
		for _, comp := range ms.GetAllComponents() {
			out <- comp.GetKey()
		}
		close(out)
	}()
	return out
}
