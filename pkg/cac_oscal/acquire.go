package cac_oscal

import (
	"fmt"
	"os/exec"
	"sync"

	"github.com/RedHatGov/ocdb/pkg/git"
	"github.com/RedHatGov/ocdb/pkg/utils"
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
	return make("docx")
}

func make(target string) error {
	makeCmd := exec.Command("make", target)
	makeCmd.Dir = gitCache
	logWriter := utils.LogWriter{}
	makeCmd.Stdout = logWriter
	makeCmd.Stderr = logWriter
	err := makeCmd.Run()
	if err != nil {
		return fmt.Errorf("Error running make: %v", err)
	}
	return nil
}
