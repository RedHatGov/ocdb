package masonry

import (
	"os"
	"path/filepath"

	"github.com/opencontrol/compliance-masonry/pkg/cli/get"
	"github.com/opencontrol/compliance-masonry/tools/fs"
)

func opencontrolYaml() ([]byte, error) {
	return fs.OSUtil{}.OpenAndReadFile("config/opencontrol.yaml")
}

// BuildCache of opencontrols as defined in opencontrol.yaml
func BuildCache() error {
	configSchema, err := opencontrolYaml()
	if err != nil {
		return err
	}
	wd, err := os.Getwd()
	if err != nil {
		return err
	}
	destination := filepath.Join(wd, ".masonry_cache")
	return get.Get(destination, configSchema)
}
