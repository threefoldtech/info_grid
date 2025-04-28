---
title: "HTTPS with Caddy"
sidebar_position: 301
---





## Introduction

We show how to set HTTPS with Caddy for any deployment on the grid.

## Prerequisites

- A deployment on the TFGrid and SSH access

## Set HTTPS

We set HTTPS with Caddy.

- Install Caddy
    ```
    apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' > /etc/apt/sources.list.d/caddy-stable.list
    apt update
    apt install caddy
    ```
- Set a reverse proxy on port 80 with your own domain
    ```
    caddy reverse-proxy -r --from example.com --to :80
    ```

You should see in the logs that it successfully obtains an SSL certificate, and after that you can try navigating to your site's domain again to verify it's working. Using a private window or adding `https://` specifically might be necessary until your browser drops its cache.

When you're satisfied that everything looks good, hit `ctl-c` to exit Caddy and we'll proceed to making this persistent.

### Adjust the Firewall

To use Caddy and set HTTPS, we want to allow port 443. If you are using `ufw`, add the permission for HTTPS:

* Add the permissions
  * ```
    ufw allow 443
    ```

### Manage with zinit

We manage Caddy with zinit.

- Open the file for editing
    ```bash
    nano /etc/zinit/caddy.yaml
    ```
- Insert the following line with your own domain and save the file
    ```
    exec: caddy reverse-proxy -r --from example.com --to :80
    ```
- Add the new Caddy file to zinit
    ```bash
    zinit monitor caddy
    ```

Zinit will start up Caddy immediately, restart it if it ever crashes, and start it up automatically after any reboots. Assuming you tested the Caddy invocation above and used the same form here, that should be all there is to it. 

Here are some other Zinit commands that could be helpful to troubleshoot issues:

- See status of all services (same as "zinit list")
    ```
    zinit
    ```
- Get logs for a service
    ```
    zinit log caddy
    ```
- Restart a service (to test configuration changes, for example)
    ```
    zinit stop caddy
    zinit start caddy
    ```

## Questions and Feedback

If you have any questions or feedback, please let us know by either writing a post on the [ThreeFold Forum](https://forum.threefold.io/), or by chatting with us on the [TF Grid Tester Community](https://t.me/threefoldtesting) Telegram channel.