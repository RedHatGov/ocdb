# Open Controls Database

## Quick Demo
  * run demo in container
  ```
  podman run -it -p "3000:3000" quay.io/slukasik/ocdb
  ```
  * point your browser to [http://127.0.0.1:3000](http://127.0.0.1:3000)

## Developer Setup

  * install golang
  * acquire buffallo tool - `go get -u -v github.com/gobuffalo/buffalo/buffalo`
  * optionally consider installing bash completion: https://gobuffalo.io/en/docs/getting-started/integrations
  * setup database - `buffalo pop create -a` (amend database.yml if needed)
  * run server `buffalo dev`
  * point your browser to [http://127.0.0.1:3000](http://127.0.0.1:3000)
