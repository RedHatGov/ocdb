# Open Controls Database

## Quick Demo
  * run demo in container
  ```
  podman run -it -p "3000:3000" quay.io/slukasik/ocdb
  ```
  * point your browser to [http://127.0.0.1:3000](http://127.0.0.1:3000)

## Developer Setup

  * install golang `dnf install golang`
  * acquire ocdb - `go get -u -v github.com/isimluk/ocdb`
  * change dir to the source location - `cd ~/go/src/github.com/isimluk/ocdb`
  * acquire buffallo tool - `go get -v github.com/gobuffalo/buffalo/buffalo`
    * optionally consider installing bash completion: https://gobuffalo.io/en/docs/getting-started/integrations
  * build front-end pipeline
    * install npm `dnf install -y npm`
    * install yarn `npm install -g yarn`
    * install frontend dependencies `yarn install`
  * run server `buffalo dev`
  * point your browser to [http://127.0.0.1:3000](http://127.0.0.1:3000)

## Developer Links
  * [latest builds](https://quay.io/repository/slukasik/ocdb)
  * [Patternfly 4 documentation](https://patternfly-react.surge.sh/patternfly-4/) or [slightly different version](https://www.patternfly.org/v4/documentation/react/)
