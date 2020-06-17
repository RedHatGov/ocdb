package cac

import "net/http"

func BuildFiles() http.FileSystem {
	return http.Dir(contentCache + "/build")
}
