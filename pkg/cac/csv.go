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
	err = srgToCsv("rhel8")
	if err != nil {
		return err
	}
	return srgToCsv("rhel7")
}

func srgToCsv(product string) error {
	cmd := exec.Command("/usr/bin/xsltproc",
		"--stringparam", "map-to-items", product+"/xccdf-linked-srg-overlay.xml",
		"--stringparam", "ocil-document", product+"/ocil-linked.xml",
		"--output", "tables/table-"+product+"-srgmap-flat.csv",
		xsltFilename,
		"../shared/references/disa-os-srg-v1r6.xml")
	cmd.Dir = gitCache + "/build"
	cmdErr := &bytes.Buffer{}
	cmd.Stdout = &utils.LogWriter{}
	cmd.Stderr = cmdErr

	err := cmd.Run()
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
	return ioutil.WriteFile(gitCache+"/build/"+xsltFilename, xsltBytes, 0600)
}
