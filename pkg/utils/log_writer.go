package utils

import "github.com/gobuffalo/buffalo"

var Log buffalo.Logger

func SetLogger(logger buffalo.Logger) {
	Log = logger
}

type LogWriter struct{}

func (LogWriter) Write(p []byte) (n int, err error) {
	length := len(p)
	if p[length-1] == '\n' {
		p = p[:length-1]
	}
	Log.Debug(string(p))
	return length, nil
}
