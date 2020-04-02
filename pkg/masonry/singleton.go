package masonry

import (
	"sync"
)

var instance *OpencontrolData
var mux sync.Mutex

// GetInstance gets memory representation of the masonry cache
func GetInstance() *OpencontrolData {
	if instance == nil {
		Refresh()
	}
	return instance
}

// Refresh function refreshes masonry data
func Refresh() error {
	mux.Lock()
	defer mux.Unlock()
	data, err := NewOpencontrolData("master", "/tmp/.masonry_cache")
	if err != nil {
		return err
	}
	instance = data
	return nil
}
