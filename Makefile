GOOS := linux
GOARCH := amd64
DOCKER_CLI_VERSION := v26.1.3
DOCKER_BUILDX_VERSION := v0.14.1

.PHONY: build-cli
build-cli:
	dagger call build-cli --goos $(GOOS) --goarch $(GOARCH) --version $(DOCKER_CLI_VERSION) directory --path=/go/src/github.com/docker/cli/build export --path=./build

.PHONY: build-buildx
build-buildx:
	dagger call build-buildx --goos $(GOOS) --goarch $(GOARCH) --version $(DOCKER_BUILDX_VERSION) directory --path=/go/src/github.com/docker/buildx/bin/build export --path=./build

.PHONY: build-ollama
build-ollama:
	dagger call build-ollama --src=$(shell pwd)/ollama
