FROM ollama/ollama:0.1.27

RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    tmux \
    iproute2

COPY --from=docker.io/tailscale/tailscale:stable /usr/local/bin/tailscaled /app/tailscaled
COPY --from=docker.io/tailscale/tailscale:stable /usr/local/bin/tailscale /app/tailscale
RUN mkdir -p /var/run/tailscale /var/cache/tailscale /var/lib/tailscale
