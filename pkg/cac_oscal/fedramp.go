package cac_oscal

import (
	"fmt"
	"io"
	"os"
)

func FedrampDocument(componentId, level, format string) (io.ReadCloser, error) {
	switch format {
	case "xml":
		path := fedrampPath(componentId, level, format)
		return os.Open(path)
	default:
		return nil, fmt.Errorf("Unsupported FedRAMP formatting: %s", format)
	}
}

func FedrampDocx(componentId, level string) (io.ReadCloser, error) {
	docxPath := fedrampPath(componentId, level, "docx")
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
	return make("docx/" + fedrampFilename(componentId, level, "docx"))
}

func fedrampPath(componentId, level, format string) string {
	return fmt.Sprintf("%s/%s/%s", gitCache, format, fedrampFilename(componentId, level, format))
}

func fedrampFilename(componentId, level, format string) string {
	return fmt.Sprintf("%s-fedramp-%s.%s", componentId, level, format)
}
