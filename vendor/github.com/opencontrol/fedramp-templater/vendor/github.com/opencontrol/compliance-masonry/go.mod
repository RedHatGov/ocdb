module github.com/opencontrol/compliance-masonry

go 1.13

require (
	github.com/Masterminds/vcs v1.13.1
	github.com/blang/semver v3.5.1+incompatible
	github.com/codegangsta/cli v0.0.0-00010101000000-000000000000
	github.com/davecgh/go-spew v0.0.0-20151105211317-5215b55f46b2
	github.com/go-utils/ufs v0.0.0-00010101000000-000000000000
	github.com/golang/protobuf v0.0.0-20160712193813-874264fbbb43
	github.com/onsi/ginkgo v1.2.1-0.20160713133600-01a0bc330e32
	github.com/onsi/gomega v0.0.0-20160713044445-9574b2d94c03
	github.com/opencontrol/compliance-masonry/commands/docs v0.0.0-00010101000000-000000000000
	github.com/opencontrol/doc-template v0.0.0-20190718133209-dc8b9ba59eec
	github.com/pmezard/go-difflib v0.0.0-20151028094244-d8ed2627bdf0
	github.com/stretchr/objx v0.0.0-20140526180921-cbeaeb16a013
	github.com/stretchr/testify v1.1.4-0.20160615092844-d77da356e56a
	github.com/tg/gosortmap v0.0.0-20150903133455-9e9c6c22cdeb
	github.com/vektra/errors v0.0.0-20140903201135-c64d83aba85a
	golang.org/x/sys v0.0.0-20191128015809-6d18c012aee9
	gopkg.in/fatih/set.v0 v0.0.0-00010101000000-000000000000
	gopkg.in/yaml.v2 v2.2.7
	vbom.ml/util v0.0.0-20180919145318-efcd4e0f9787
)

replace gopkg.in/fatih/set.v0 => ./vendor/gopkg.in/fatih/set.v0

replace github.com/go-utils/uslice => ../../go-utils/uslice

replace github.com/go-utils/ustr => ../../go-utils/ustr

replace github.com/go-utils/ufs => ../../go-utils/ufs

replace github.com/go-utils/ugo => ../../go-utils/ugo

replace github.com/opencontrol/compliance-masonry/commands/docs => ./commands/docs

replace github.com/opencontrol/compliance-masonry/models => ./models

replace github.com/opencontrol/compliance-masonry/config => ./config

replace github.com/codegangsta/cli => github.com/urfave/cli v1.18.1-0.20160712171436-3a5216227e14

replace github.com/go-forks/fsnotify => ../../go-forks/fsnotify
