package grifts

import (
	"github.com/gobuffalo/buffalo"
	"github.com/RedHatGov/ocdb/actions"
)

func init() {
	buffalo.Grifts(actions.App())
}
