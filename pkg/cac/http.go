package cac

import "net/http"

func HttpFiles() http.FileSystem {
	return http.Dir(contentCache + "/build")
}
