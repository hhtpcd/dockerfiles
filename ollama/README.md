# Tailscale + Ollama Docker

Builds a container image that has ollama and Tailscale in. We can deploy this
on Cloud GPU servers and connect to the Ollama API over Tailscale.

## Running

Start the container image - Ollama will start the API server on `*:11434*`

Then we can start the `tailscaled` process with userspace networking mode because
we might not have `/dev/tun` available. This is pretty typical for container
runtime environments.

```sh
tailscaled -tun userspace-networking
```

Then authenticate Tailscale

``` sh
tailscale up --authkey=TS_AUTH_KEY --hostname something
```

Now it's on your Tailnet and you can access the Ollama API, privately.
