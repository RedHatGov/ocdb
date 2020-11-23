package cac_oscal

import (
	"fmt"
	"io"
	"os"
)

func FedrampDocument(componentId, level, format string) (io.ReadCloser, error) {
	path := fedrampPath(componentId, level, format)
	switch format {
	case "docx":
		file, err := os.Open(path)
		if err != nil {
			err = buildFedrampDocx(componentId, level)
			if err != nil {
				return nil, err
			}
			file, err = os.Open(path)
		}
		return file, err
	case "xml":
		return os.Open(path)
	default:
		return nil, fmt.Errorf("Unsupported FedRAMP formatting: %s", format)
	}
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
