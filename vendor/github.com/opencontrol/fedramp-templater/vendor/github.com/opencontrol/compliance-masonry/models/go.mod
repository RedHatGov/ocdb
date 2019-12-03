module github.com/opencontrol/compliance-masonry/models

go 1.13

replace github.com/codegangsta/cli => github.com/urfave/cli v1.18.1-0.20160712171436-3a5216227e14

replace github.com/opencontrol/compliance-masonry => ../

replace github.com/opencontrol/compliance-masonry/config => ../config

replace github.com/go-utils/uslice => ../../../go-utils/uslice

replace github.com/go-utils/ustr => ../../../go-utils/ustr

replace github.com/go-utils/ufs => ../../../go-utils/ufs

replace github.com/go-utils/ugo => ../../../go-utils/ugo

replace github.com/opencontrol/compliance-masonry/commands/docs => ../commands/docs

replace gopkg.in/fatih/set.v0 => ../vendor/gopkg.in/fatih/set.v0/

require (
	github.com/blang/semver v3.5.1+incompatible
	github.com/codegangsta/cli v0.0.0-00010101000000-000000000000
	github.com/opencontrol/compliance-masonry v1.1.6
	github.com/opencontrol/compliance-masonry/config v0.0.0-00010101000000-000000000000
	gopkg.in/fatih/set.v0 v0.0.0-00010101000000-000000000000
	gopkg.in/yaml.v2 v2.2.7
	vbom.ml/util v0.0.0-20180919145318-efcd4e0f9787
)
