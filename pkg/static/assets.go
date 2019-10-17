package static

import "github.com/gobuffalo/packr/v2"

// Represents files under our the assets directory
var AssetsBox = packr.New("app:assets", "../../public")
