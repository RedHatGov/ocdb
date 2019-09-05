package actions

import (
	"github.com/gobuffalo/buffalo"
	"github.com/isimluk/ocdb/pkg/masonry"
)

// APIHandler is a default handler to serve API
func APIHandler(c buffalo.Context) error {
	ms := masonry.GetInstance()
	return c.Render(200, r.JSON((*ms).GetAllStandards()))
}
