package cac

import (
	"net/http"
)

func BuildFiles() http.FileSystem {
	return http.Dir(buildCache)
}

func InstalledScapFiles() http.FileSystem {
	return http.Dir(installScapCache)
}
