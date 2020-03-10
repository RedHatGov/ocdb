package masonry

import (
	"github.com/opencontrol/compliance-masonry/pkg/lib/common"
	"sync"
)

var instance *common.Workspace
var mux sync.Mutex

// GetInstance gets memory representation of the masonry cache
func GetInstance() *common.Workspace {
	if instance == nil {
		Refresh()
	}
	return instance
}

// Refresh function refreshes masonry data
func Refresh() {
	mux.Lock()
	defer mux.Unlock()
	data, err := build()
	if err != nil {
		panic(err)
	}
	instance = &data
}
