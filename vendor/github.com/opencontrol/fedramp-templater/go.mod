module github.com/opencontrol/fedramp-templater

go 1.13

require (
	github.com/Masterminds/vcs v1.13.1 // indirect
	github.com/blang/semver v3.5.1+incompatible // indirect
	github.com/codegangsta/cli v0.0.0-00010101000000-000000000000 // indirect
	github.com/go-utils/ufs v0.0.0-00010101000000-000000000000 // indirect
	github.com/jbowtie/gokogiri v0.0.0-20160420113441-94c317865760
	github.com/onsi/ginkgo v1.2.1-0.20160509182050-5437a97bf824
	github.com/onsi/gomega v0.0.0-20160222031234-a1094b2db2d4
	github.com/opencontrol/compliance-masonry v1.1.4-0.20160720151916-eb0f849c5b39
	github.com/opencontrol/doc-template v0.0.0-20160720134736-489eade80a93
	github.com/tg/gosortmap v0.0.0-20190425101757-4b9ddc7c3a61 // indirect
	github.com/vektra/errors v0.0.0-20140903201135-c64d83aba85a // indirect
	gopkg.in/fatih/set.v0 v0.2.1
	gopkg.in/yaml.v2 v2.2.7 // indirect
	vbom.ml/util v0.0.0-20180919145318-efcd4e0f9787 // indirect
)

replace (
	github.com/codegangsta/cli => github.com/urfave/cli v1.18.1-0.20160712171436-3a5216227e14
	github.com/go-utils/ufs => ./vendor/github.com/go-utils/ufs
	github.com/go-utils/ugo => ./vendor/github.com/go-utils/ugo
	github.com/go-utils/uslice => ./vendor/github.com/go-utils/uslice
	github.com/go-utils/ustr => ./vendor/github.com/go-utils/ustr
)
