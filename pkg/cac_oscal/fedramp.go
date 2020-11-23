package cac_oscal

import (
	"fmt"
	"io"
	"os"
)

func FedrampDocument(componentId, level, format string) (io.ReadCloser, error) {
	switch format {
	case "xml":
		path := fmt.Sprintf("%s/xml/%s-fedramp-%s.xml", gitCache, componentId, level)
		return os.Open(path)
	default:
		return nil, fmt.Errorf("Unsupported FedRAMP formatting: %s", format)
	}
}

func FedrampDocx(componentId, level string) (io.ReadCloser, error) {
	docxPath := fedrampDocxPath(componentId, level)
	file, err := os.Open(docxPath)
	if err != nil {
		err = buildFedrampDocx(componentId, level)
		if err != nil {
			return nil, err
		}
		file, err = os.Open(docxPath)
	}

	return file, err

}

func buildFedrampDocx(componentId, level string) error {
	oscalPath := fmt.Sprintf("%s/xml/%s-fedramp-%s.xml", gitCache, componentId, level)
	docxPath := fedrampDocxPath(componentId, level)
	newer := fileNewerThan(oscalPath, docxPath)
	if newer {
		return make("docx/" + fedrampFilename(componentId, level, "docx"))
	}
	return nil
}

func fedrampDocxPath(componentId, level string) string {
	return fmt.Sprintf("%s/%s", docxCache, fedrampFilename(componentId, level, "docx"))
}

func fedrampFilename(componentId, level, format string) string {
	return fmt.Sprintf("%s-fedramp-%s.%s", componentId, level, format)
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
