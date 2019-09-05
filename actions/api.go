package actions

import "github.com/gobuffalo/buffalo"

// APIHandler is a default handler to serve API
func APIHandler(c buffalo.Context) error {
	return c.Render(200, r.JSON("OK"))
}
