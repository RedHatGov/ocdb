package api

import (
	"github.com/gobuffalo/buffalo"
	"github.com/isimluk/ocdb/pkg/masonry"
)

// Handler is a default handler to serve API
func Handler(c buffalo.Context) error {
	ms := masonry.GetInstance()
	return c.Render(200, r.JSON((*ms).GetAllStandards()))
}
