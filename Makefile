GO=GO111MODULE=on go
GOBUILD=$(GO) build

.PHONY: vendor
vendor:
	$(GO) mod tidy
	$(GO) mod verify
