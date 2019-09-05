# Open Controls Database


## Developer Setup

- install golang
- acquire buffallo tool - `go get -u -v -tags sqlite github.com/gobuffalo/buffalo/buffalo`
- optionally consider installing bash completion: https://gobuffalo.io/en/docs/getting-started/integrations
- setup database - `buffalo pop create -a` (amend database.yml if needed)
- run server `buffalo dev`
- point your browser to [http://127.0.0.1:3000](http://127.0.0.1:3000)
