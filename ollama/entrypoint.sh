#!/usr/bin/env bash

tailscaled -tun userspace-networking &

if [ -n "$TS_AUTH_KEY" ]; then
    echo ">> attempting to authenticate with tailscale"
    tailscale up --authkey=${TS_AUTH_KEY}
else
    echo ">> no tailscale auth key found, not attempting auth"
fi

exec ollama serve
