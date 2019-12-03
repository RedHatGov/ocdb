module github.com/opencontrol/compliance-masonry/config

go 1.13

replace gopkg.in/fatih/set.v0 => ../vendor/gopkg.in/fatih/set.v0/

require (
	github.com/Masterminds/vcs v1.13.1 // indirect
	github.com/blang/semver v3.5.1+incompatible
	github.com/fatih/set v0.2.1 // indirect
	github.com/opencontrol/compliance-masonry v1.1.6
	gopkg.in/yaml.v2 v2.2.7
)
