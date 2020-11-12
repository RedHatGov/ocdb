# This is a multi-stage Dockerfile and requires >= Docker 17.05
# https://docs.docker.com/engine/userguide/eng-image/multistage-build/
FROM registry.fedoraproject.org/fedora:32 as builder

RUN mkdir -p $GOPATH/src/github.com/RedHatGov/ocdb
WORKDIR $GOPATH/src/github.com/RedHatGov/ocdb
ENV GO111MODULE on
ENV GOPROXY http://proxy.golang.org
ENV PATH ~/go/bin/:$PATH

RUN dnf update -y && \
    dnf install -y libxml2-devel golang-bin yarnpkg nodejs
# RUN apt-get update && apt-get install -y libxml2-dev zlib1g-dev liblzma-dev libicu-dev

# this will cache the npm install step, unless package.json changes
ADD package.json .
ADD yarn.lock .
RUN yarn install --no-progress
ADD . .
RUN go get github.com/gobuffalo/buffalo/buffalo
RUN go get ./...
RUN ls ~/go/bin/
RUN echo $PATH
RUN buffalo build --ldflags '-linkmode external' -o /bin/app

FROM registry.centos.org/centos:8
RUN \
	dnf install -y 'dnf-command(copr)' && \
	dnf copr enable -y openscapmaint/openscap-latest && \
	dnf install --setopt=tsflags=nodocs -y \
		bash git ca-certificates cmake make openscap-scanner python3-pyyaml python3-jinja2 python3 && \
	dnf clean all

WORKDIR /bin/

COPY --from=builder /bin/app .

# Uncomment to run the binary in "production" mode:
# ENV GO_ENV=production

# Bind the app to 0.0.0.0 so it can be seen from outside the container
ENV ADDR=0.0.0.0

EXPOSE 3000

# Uncomment to run the migrations before running the binary:
# CMD /bin/app migrate; /bin/app
CMD exec /bin/app
