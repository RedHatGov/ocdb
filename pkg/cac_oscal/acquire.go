package cac_oscal

import (
	"os"
	"sync"

	"github.com/RedHatGov/ocdb/pkg/git"
)

var mux sync.Mutex

const (
	gitCache  = "/var/tmp/ocdb/ComplianceAsCode.oscal"
	docxCache = gitCache + "/docx"
)

// Refresh function refreshes masonry data
func Refresh() error {
	mux.Lock()
	defer mux.Unlock()
	err := git.PullOrClone(gitCache, "https://github.com/ComplianceAsCode/oscal", nil)
	if err != nil {
		return err
	}
	return os.MkdirAll(docxCache, os.FileMode(0722))
}
