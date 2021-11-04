module github.com/RedHatGov/ocdb

go 1.13

require (
	github.com/Masterminds/semver/v3 v3.1.1 // indirect
	github.com/fatih/color v1.10.0 // indirect
	github.com/gobuffalo/buffalo v0.16.19
	github.com/gobuffalo/envy v1.10.1
	github.com/gobuffalo/fizz v1.13.0 // indirect
	github.com/gobuffalo/mw-csrf v1.0.0
	github.com/gobuffalo/mw-i18n v1.1.0
	github.com/gobuffalo/mw-paramlogger v1.0.0
	github.com/gobuffalo/nulls v0.4.0 // indirect
	github.com/gobuffalo/packr/v2 v2.8.1
	github.com/gobuffalo/pop/v5 v5.3.1 // indirect
	github.com/gobuffalo/suite v2.8.2+incompatible
	github.com/gobuffalo/validate/v3 v3.3.0 // indirect
	github.com/gocomply/scap v0.1.1 // indirect
	github.com/gofrs/uuid v4.0.0+incompatible // indirect
	github.com/google/go-cmp v0.5.2 // indirect
	github.com/gorilla/handlers v1.5.1 // indirect
	github.com/gorilla/mux v1.8.0 // indirect
	github.com/gorilla/sessions v1.2.1 // indirect
	github.com/jackc/pgproto3/v2 v2.0.7 // indirect
	github.com/jackc/pgx/v4 v4.10.1 // indirect
	github.com/karrick/godirwalk v1.16.1 // indirect
	github.com/konsorten/go-windows-terminal-sequences v1.0.3 // indirect
	github.com/lib/pq v1.8.0 // indirect
	github.com/markbates/grift v1.5.0
	github.com/microcosm-cc/bluemonday v1.0.4 // indirect
	github.com/monoculum/formam v0.0.0-20200923020755-6f187e4ffe27 // indirect
	github.com/opencontrol/compliance-masonry v1.1.7-0.20200827173050-70bb3370161e
	github.com/pelletier/go-toml v1.8.1 // indirect
	github.com/rolieup/golie v0.2.1
	github.com/sirupsen/logrus v1.7.0 // indirect
	github.com/spf13/cobra v1.1.1 // indirect
	golang.org/x/crypto v0.0.0-20201221181555-eec23a3978ad // indirect
	golang.org/x/net v0.0.0-20201224014010-6772e930b67b // indirect
	golang.org/x/sync v0.0.0-20201207232520-09787c993a3a // indirect
	golang.org/x/sys v0.0.0-20210105210732-16f7687f5001 // indirect
	golang.org/x/term v0.0.0-20201210144234-2321bbc49cbf // indirect
	golang.org/x/text v0.3.5 // indirect
	golang.org/x/xerrors v0.0.0-20200804184101-5ec99f83aff1 // indirect
	gopkg.in/yaml.v2 v2.4.0 // indirect
	gopkg.in/yaml.v3 v3.0.0-20200615113413-eeeca48fe776 // indirect
	vbom.ml/util v0.0.3 // indirect
)

replace (
	github.com/codegangsta/cli => github.com/urfave/cli v1.18.1-0.20160712171436-3a5216227e14
	github.com/go-utils/ufs => ./vendor/github.com/opencontrol/fedramp-templater/vendor/github.com/go-utils/ufs
	github.com/go-utils/ugo => ./vendor/github.com/opencontrol/fedramp-templater/vendor/github.com/go-utils/ugo
	github.com/go-utils/uslice => ./vendor/github.com/opencontrol/fedramp-templater/vendor/github.com/go-utils/uslice
	github.com/go-utils/ustr => ./vendor/github.com/opencontrol/fedramp-templater/vendor/github.com/go-utils/ustr
	github.com/opencontrol/compliance-masonry/commands/docs => ./vendor/github.com/opencontrol/fedramp-templater/vendor/github.com/opencontrol/compliance-masonry/commands/docs
	github.com/opencontrol/compliance-masonry/config => ./vendor/github.com/opencontrol/fedramp-templater/vendor/github.com/opencontrol/compliance-masonry/config
	github.com/opencontrol/compliance-masonry/models => ./vendor/github.com/opencontrol/fedramp-templater/vendor/github.com/opencontrol/compliance-masonry/models
	github.com/opencontrol/fedramp-templater => ./vendor/github.com/opencontrol/fedramp-templater
	gopkg.in/fatih/set.v0 => ./vendor/github.com/opencontrol/fedramp-templater/vendor/github.com/opencontrol/compliance-masonry/vendor/gopkg.in/fatih/set.v0
	vbom.ml/util => github.com/fvbommel/util v0.0.0-20180919145318-efcd4e0f9787
)
