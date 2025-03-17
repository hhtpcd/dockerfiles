/**
 * A generated module for K3S functions
 *
 * This module has been generated via dagger init and serves as a reference to
 * basic module structure as you get started with Dagger.
 *
 * Two functions have been pre-created. You can modify, delete, or add to them,
 * as needed. They demonstrate usage of arguments and return types using simple
 * echo and grep commands. The functions can be called from the dagger CLI or
 * from one of the SDKs.
 *
 * The first line in this comment block is a short description line and the
 * rest is a long description with more detail on the module's purpose or usage,
 * if appropriate. All modules should have a short description.
 */
import { dag, Container, Directory, object, func } from "@dagger.io/dagger";

@object()
class K3S {
  /**
   * Builds the docker/cli project in a container
   */
  @func()
  buildCli(goos: string, goarch: string, version: string): Container {
    let repoSrc = dag
      .git("https://github.com/docker/cli", { keepGitDir: true })
      .tag(version)
      .tree();

    return dag
      .container()
      .from("golang:1.22.11-bullseye")
      .withMountedDirectory("/go/src/github.com/docker/cli", repoSrc)
      .withWorkdir("/go/src/github.com/docker/cli")
      .withEnvVariable("DISABLE_WARN_OUTSIDE_CONTAINER", "1")
      .withEnvVariable("CGO_ENABLED", "0")
      .withEnvVariable("GOOS", goos)
      .withEnvVariable("GOARCH", goarch)
      .withExec(["make", "binary"]);
  }

  @func()
  buildBuildx(goos: string, goarch: string, version: string): Container {
    let repoSrc = dag
      .git("https://github.com/docker/buildx", { keepGitDir: true })
      .tag(version)
      .tree();

    return dag
      .container()
      .from("golang:1.23-bullseye")
      .withMountedDirectory("/go/src/github.com/docker/buildx", repoSrc)
      .withWorkdir("/go/src/github.com/docker/buildx")
      .withEnvVariable("DISABLE_WARN_OUTSIDE_CONTAINER", "1")
      .withEnvVariable("CGO_ENABLED", "0")
      .withEnvVariable("GOOS", goos)
      .withEnvVariable("GOARCH", goarch)
      .withExec(["make", "build"]);
  }

  @func()
  buildOllama(src: Directory): Container {
    return dag
      .container()
      .withDirectory("/src", src)
      .withWorkdir("/src")
      .directory("/src")
      .dockerBuild();
  }

  @func()
  buildGron(goos: string, goarch: string): Container {
    let repoSrc = dag
      .git("https://github.com/tomnomnom/gron", { keepGitDir: true })
      .head()
      .tree();

    return dag
      .container()
      .from("golang:1.21-bullseye")
      .withMountedDirectory("/go/src/github.com/tomnomnom/gron", repoSrc)
      .withWorkdir("/go/src/github.com/tomnomnom/gron")
      .withEnvVariable("CGO_ENABLED", "0")
      .withEnvVariable("GOOS", goos)
      .withEnvVariable("GOARCH", goarch)
      .withExec(["go", "build", "-o", "/usr/local/bin/gron"]);
  }
}
