package cac

import (
	"bytes"
	"fmt"
	"github.com/RedHatGov/ocdb/pkg/git"
	"github.com/RedHatGov/ocdb/pkg/utils"

	"os"
	"os/exec"
	"sync"
)

var mux sync.Mutex

const contentCache = "/tmp/.scap_cache"

// Refresh function refreshes masonry data
func Refresh() {
	mux.Lock()
	defer mux.Unlock()
	err := refreshRepo()
	if err != nil {
		panic(err)
	}
	err = cmake()
	if err != nil {
		panic(err)
	}
	err = make()
	if err != nil {
		panic(err)
	}
	err = makeSrgCsv()
	if err != nil {
		panic(err)
	}
}

func make() error {
	makeCmd := exec.Command("make")
	makeCmd.Dir = contentCache + "/build/"
	makeCmdErr := &bytes.Buffer{}
	makeCmd.Stdout = &utils.LogWriter{}
	makeCmd.Stderr = makeCmdErr

	err := makeCmd.Run()
	if err != nil || makeCmdErr.Len() > 0 {
		return fmt.Errorf("Error running make: %v, stderr was: %s", err, makeCmdErr.String())
	}
	return nil
}

func cmake() error {
	cmakeParams := []string{
		"-DSSG_PRODUCT_DEFAULT:BOOLEAN=FALSE",
		"-DSSG_PRODUCT_RHEL6:BOOLEAN=TRUE",
		"-DSSG_PRODUCT_RHEL7:BOOLEAN=TRUE",
		"-DSSG_PRODUCT_RHEL8:BOOLEAN=TRUE",
		"-DSSG_PRODUCT_OCP3:BOOLEAN=TRUE",
		"-DSSG_PRODUCT_OCP4:BOOLEAN=TRUE",
		"-DSSG_PRODUCT_FIREFOX:BOOLEAN=TRUE",
		"-DSSG_PRODUCT_JRE:BOOLEAN=TRUE",
		"-DCMAKE_BUILD_TYPE=Debug",
		"-DSSG_CENTOS_DERIVATIVES_ENABLED:BOOL=OFF",
		"-DSSG_SCIENTIFIC_LINUX_DERIVATIVES_ENABLED:BOOL=OFF",
		"../",
	}
	cmakeCmd := exec.Command("cmake", cmakeParams...)
	cmakeCmd.Dir = contentCache + "/build/"
	cmakeCmdErr := &bytes.Buffer{}
	cmakeCmd.Stdout = &utils.LogWriter{}
	cmakeCmd.Stderr = cmakeCmdErr

	err := cmakeCmd.Run()
	if err != nil || cmakeCmdErr.Len() > 0 {
		return fmt.Errorf("Error running cmake: %v, stderr was: %s", err, cmakeCmdErr.String())
	}
	return nil
}
func refreshRepo() error {
	if stat, err := os.Stat(contentCache); err == nil && stat.IsDir() {
		return git.Pull(contentCache)
	}
	return git.Clone("https://github.com/ComplianceAsCode/content", contentCache)
}
