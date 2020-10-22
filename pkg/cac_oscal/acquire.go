package cac_oscal

import (
	"os"
	"sync"

	"github.com/RedHatGov/ocdb/pkg/git"
	"github.com/RedHatGov/ocdb/pkg/masonry"
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
			err := buildFedrampDocx(componentId, level)
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
