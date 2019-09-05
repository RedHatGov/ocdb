package grifts

import (
	"github.com/gobuffalo/buffalo"
	"github.com/isimluk/ocdb/actions"
)

func init() {
	buffalo.Grifts(actions.App())
}
