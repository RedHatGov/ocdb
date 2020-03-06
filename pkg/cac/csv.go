package cac

import (
	"bytes"
	"fmt"
	"github.com/RedHatGov/ocdb/pkg/static"
	"github.com/RedHatGov/ocdb/pkg/utils"
	"io/ioutil"

	"os/exec"
)

const xsltFilename = "srg-to-csv.xslt"

func makeSrgCsv() error {
	err := unbundleXslt()
	if err != nil {
		return err
	}
	cmd := exec.Command("/usr/bin/xsltproc",
		"--stringparam", "map-to-items", "rhel8/xccdf-linked-srg-overlay.xml",
		"--stringparam", "ocil-document", "rhel8/ocil-linked.xml",
		"--output", "tables/table-rhel8-srgmap-flat.csv",
		xsltFilename,
		"../shared/references/disa-os-srg-v1r6.xml")
	cmd.Dir = contentCache + "/build"
	cmdErr := &bytes.Buffer{}
	cmd.Stdout = &utils.LogWriter{}
	cmd.Stderr = cmdErr

	err = cmd.Run()
	if err != nil || cmdErr.Len() > 0 {
		return fmt.Errorf("Error running xsltproc: %v, stderr was: %s", err, cmdErr.String())
	}
	return nil
}

func unbundleXslt() error {
	xsltBytes, err := static.AssetsBox.Find("/" + xsltFilename)
	if err != nil {
		return fmt.Errorf("Assets pack does not contain %s: %v", xsltFilename, err)
	}
	return ioutil.WriteFile(contentCache+"/build/"+xsltFilename, xsltBytes, 0600)
}
