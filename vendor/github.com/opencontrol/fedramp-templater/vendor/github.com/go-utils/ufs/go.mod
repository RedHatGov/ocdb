module github.com/go-utils/ufs

go 1.13

require (
	github.com/go-forks/fsnotify v1.4.7
	github.com/go-utils/uslice v0.0.0-00010101000000-000000000000
	github.com/go-utils/ustr v0.0.0-00010101000000-000000000000
	golang.org/x/sys v0.0.0-20191128015809-6d18c012aee9 // indirect
)

replace github.com/go-utils/uslice => ../uslice

replace github.com/go-utils/ustr => ../ustr

replace github.com/go-utils/ugo => ../ugo

replace github.com/go-forks/fsnotify => ../../go-forks/fsnotify
