package utils

import "github.com/gobuffalo/buffalo"

var log buffalo.Logger

func SetLogger(logger buffalo.Logger) {
	log = logger
}

type LogWriter struct{}

func (LogWriter) Write(p []byte) (n int, err error) {
	log.Debug(string(p))
	return len(p), nil
}
