package actions

import "github.com/gobuffalo/buffalo"

// PatternflyReactHandler is a default handler to serve up
// a home page.
func PatternflyReactHandler(c buffalo.Context) error {
	return c.Render(200, r.HTML("index.html"))
}
