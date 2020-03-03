package cac

import (
	"sync"
)

var mux sync.Mutex

// Refresh function refreshes masonry data
func Refresh() {
	mux.Lock()
	defer mux.Unlock()
	panic("BUM")
}
