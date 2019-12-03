module github.com/RedHatGov/ocdb

go 1.13

require (
	github.com/gobuffalo/buffalo v0.15.3
	github.com/gobuffalo/envy v1.8.1
	github.com/gobuffalo/mw-csrf v0.0.0-20190129204204-25460a055517
	github.com/gobuffalo/mw-forcessl v0.0.0-20190224202501-6d1ef7ffb276
	github.com/gobuffalo/mw-i18n v0.0.0-20190224203426-337de00e4c33
	github.com/gobuffalo/mw-paramlogger v0.0.0-20190224201358-0d45762ab655
	github.com/gobuffalo/packr/v2 v2.7.1
	github.com/jbowtie/gokogiri v0.0.0-20190301021639-37f655d3078f // indirect
	github.com/opencontrol/compliance-masonry v1.1.6
	github.com/opencontrol/compliance-masonry/commands/docs v0.0.0-00010101000000-000000000000 // indirect
	github.com/opencontrol/compliance-masonry/models v0.0.0-00010101000000-000000000000 // indirect
	github.com/opencontrol/fedramp-templater v0.0.0-00010101000000-000000000000
	github.com/unrolled/secure v1.0.6
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

)
