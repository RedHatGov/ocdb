package cac_oscal

import (
	"fmt"
	"github.com/gocomply/fedramp/pkg/templater"
	"os"
)

func buildFedrampDocx(componentId, level string) error {
	oscalPath := fmt.Sprintf("%s/xml/%s-fedramp-%s.xml", gitCache, componentId, level)
	docxPath := fedrampDocxPath(componentId, level)
	newer := fileNewerThan(oscalPath, docxPath)
	if newer {
		err := templater.ConvertFile(oscalPath, docxPath)
		if err != nil {
			return err
		}
	}
	return nil
}

func fedrampDocxPath(componentId, level string) string {
	return fmt.Sprintf("%s/FedRAMP-%s-%s.docx", docxCache, level, componentId)
}

func fileNewerThan(a, b string) bool {
	aInfo, err := os.Stat(a)
	if err != nil {
		return true
	}
	bInfo, err := os.Stat(b)
	if err != nil {
		return true
	}
	return aInfo.ModTime().After(bInfo.ModTime())

}
