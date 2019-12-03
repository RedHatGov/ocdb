module github.com/opencontrol/compliance-masonry/commands/docs

go 1.13

require github.com/opencontrol/doc-template v0.0.0-20190718133209-dc8b9ba59eec

replace github.com/opencontrol/compliance-masonry => ../../

replace github.com/codegangsta/cli => github.com/urfave/cli v1.18.1-0.20160712171436-3a5216227e14

replace gopkg.in/fatih/set.v0 => ../../vendor/gopkg.in/fatih/set.v0/

replace github.com/go-utils/uslice => ../../../../go-utils/uslice

replace github.com/go-utils/ustr => ../../../../go-utils/ustr

replace github.com/go-utils/ufs => ../../../../go-utils/ufs

replace github.com/go-utils/ugo => ../../../../go-utils/ugo
