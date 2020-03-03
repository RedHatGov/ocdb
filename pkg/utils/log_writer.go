package utils

import "github.com/gobuffalo/buffalo"

var log buffalo.Logger

func SetLogger(logger buffalo.Logger) {
	log = logger
}

type LogWriter struct{}

func (LogWriter) Write(p []byte) (n int, err error) {
	length := len(p)
	if p[length-1] == '\n' {
		p = p[:length-1]
	}
	log.Debug(string(p))
	return length, nil
}
