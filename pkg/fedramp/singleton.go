package fedramp

import (
	"sync"
)

var instance *FedrampCache
var once sync.Once

// GetInstance gets memory representation of the masonry cache
func getInstance() *FedrampCache {
	once.Do(func() {
		instance = newFedrampCache()

	})
	return instance
}

// Get returns Fedramp DOCX document for particular component
func Get(componentId string, fedrampLevel string) *FedrampDocument {
	return (*getInstance()).get(componentId, fedrampLevel)
}
