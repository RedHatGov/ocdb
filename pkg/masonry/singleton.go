package masonry

import (
	"github.com/opencontrol/compliance-masonry/pkg/lib"
	"github.com/opencontrol/compliance-masonry/pkg/lib/common"
	"sync"
)

var instance *common.Workspace
var once sync.Once

// GetInstance gets memory representation of the masonry cache
func GetInstance() *common.Workspace {
	once.Do(func() {
		err := BuildCache()
		if err != nil {
			panic(err)
		}
		data, errors := lib.LoadData("/tmp/.masonry_cache", "/tmp/.masonry_cache/certifications/dhs-4300a.yaml")
		if errors != nil {
			panic(errors)
		}
		instance = &data
	})
	return instance
}
