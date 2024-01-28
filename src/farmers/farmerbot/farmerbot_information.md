
<h1> Farmerbot Additional Information </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Additional Information](#additional-information)
  - [General considerations](#general-considerations)
  - [Minimum specs to run the Farmerbot](#minimum-specs-to-run-the-farmerbot)
  - [The differences between power "state" and power "target"](#the-differences-between-power-state-and-power-target)
  - [The differences between uptime, status and power state](#the-differences-between-uptime-status-and-power-state)
  - [The sequence of events for a node managed by the Farmerbot](#the-sequence-of-events-for-a-node-managed-by-the-farmerbot)
  - [The problematic states of a 3node set with the Farmerbot](#the-problematic-states-of-a-3node-set-with-the-farmerbot)
  - [Using the ThreeFold Node Status Bot](#using-the-threefold-node-status-bot)
  - [CPU overprovisioning](#cpu-overprovisioning)
  - [Seed phrase and HEX secret](#seed-phrase-and-hex-secret)
  - [Farmerbot directory tree](#farmerbot-directory-tree)
  - [Run multiple Farmerbots on the same computer or VM](#run-multiple-farmerbots-on-the-same-computer-or-vm)
  - [Dedicated Nodes and the Farmerbot](#dedicated-nodes-and-the-farmerbot)
  - [Run the Farmerbot on Raspberry Pi](#run-the-farmerbot-on-raspberry-pi)
  - [Periodic wakeup](#periodic-wakeup)
  - [Time period between random wakeups and power target update](#time-period-between-random-wakeups-and-power-target-update)
  - [Farmerbot and UTC time](#farmerbot-and-utc-time)
- [Maintenance](#maintenance)
  - [See the Farmerbot logs](#see-the-farmerbot-logs)
  - [See the power state and power target of a 3Node with GraphQL](#see-the-power-state-and-power-target-of-a-3node-with-graphql)
  - [Change manually the power target of a 3Node](#change-manually-the-power-target-of-a-3node)
  - [Properly reboot the node if power target "Down" doesn't work](#properly-reboot-the-node-if-power-target-down-doesnt-work)
  - [Stop and restart the Farmerbot](#stop-and-restart-the-farmerbot)
  - [Update the Farmerbot with the new release](#update-the-farmerbot-with-the-new-release)
  - [Add a 3Node to a running Farmerbot](#add-a-3node-to-a-running-farmerbot)
- [Troubleshooting](#troubleshooting)
  - [Retrieve the Farmerbot log after receiving the error: "Error grabbing logs"](#retrieve-the-farmerbot-log-after-receiving-the-error-error-grabbing-logs)
  - [Fix the error: "WebSocket protocol error: Connection reset without closing handshake"](#fix-the-error-websocket-protocol-error-connection-reset-without-closing-handshake)
  - [Fix the error: "Balance is not enough to apply an extrinsic"](#fix-the-error-balance-is-not-enough-to-apply-an-extrinsic)
  - [Fix the error: "Error: Invalid twin id. Twin id must be postive integer"](#fix-the-error-error-invalid-twin-id-twin-id-must-be-postive-integer)
  - [Fix the error: "Dependency failed to start: container qa-redis-1 is unhealthy"](#fix-the-error-dependency-failed-to-start-container-qa-redis-1-is-unhealthy)
  - [Fix the error: "Node xxx is not responding while we expect it to: timeout on blpop"](#fix-the-error-node-xxx-is-not-responding-while-we-expect-it-to-timeout-on-blpop)
  - [Fix the error: "Failed initializing the database: Invalid duration value"](#fix-the-error-failed-initializing-the-database-invalid-duration-value)
  - [Fix the error: "Invalid characters for a local volume name... If you intended to pass a host directory, use absolute path."](#fix-the-error-invalid-characters-for-a-local-volume-name-if-you-intended-to-pass-a-host-directory-use-absolute-path)
- [Questions and Feedback](#questions-and-feedback)

***

## Introduction

We present some general information concerning the Farmerbot as well as some advice for proper maintenance and troubleshooting.



## Additional Information

### General considerations

The Farmerbot doesn’t have to run physically in the farm since it instructs nodes over RMB to power on and off. The Farmerbot should be running at all time. 

The Farmerbot uses the nodes in the farm to send WOL packets to the node that needs to wakeup. For this reason, you need at least one node per farm to be powered on at all time. If you do not specify one node to be always on (**never_shutdown:true**), the Farmerbot will randomly choose a node to stay on for each cycle. If all nodes in a subnet are powered off, there is no way other nodes in other subnets will be able to power them on again.

Note that if you run the Farmerbot on your farm, it is logical to set the node running the Farmerbot as always on (**never_shutdown:true**). In this case, it will always be this node that wakes up the other nodes.

Currently, you can run only one Farmerbot per farm. Since you can only deploy one Farmerbot per farm, the Farmerbot can only run on one node at a time. 

Since you need at least one node to power up a second node, you can't use the Farmerbot with just one node. You need at least two 3Nodes in your farm to correctly use the Farmerbot.



### Minimum specs to run the Farmerbot

The Farmerbot can run on any computer/server, it could even run on a laptop, so to speak. As long as it has an internet connection, the Farmerbot will be working fine.

The Farmerbot runs fine on a VM with a single vcore and 2GB of RAM. For the storage, you need to have room for Docker and its dependencies. Thus 1 or 2GB of free storage, with the OS already installed, should be sufficient.


### The differences between power "state" and power "target"

The target is what is set by the Farmerbot or can be set by the farmer manually on TF Chain. Power state can only be set by the node itself, in response to power targets it observes on chain.



### The differences between uptime, status and power state

There are three distinctly named endpoints or fields that exist in the back end systems:

* Uptime
  * number of seconds the node was up, as of it's last uptime report. This is the same on GraphQL and Grid Proxy.
* Status
  * this is a field that only exists on the Grid Proxy, which corresponds to whether the node sent an uptime report within the last 40 minutes.
* Power state
  * this is a field that only exists on GraphQL, and it's the self reported power state of the node. This only goes to "down" if the node shut itself down at request of the Farmerbot.



### The sequence of events for a node managed by the Farmerbot

The sequence of events for a node managed by farmerbot should look like this:

1. Node is online. Target, state, and status are all "Up".
2. Farmerbot sets node's target to "Down".
3. Node sets its state to "Down" and then shuts off.
4. Three hours later the status switches to "Down" because the node hasn't been updated.
5. At periodic wake up time, Farmerbot sets node's target to "Up".
6. Node receives WoL packet and starts booting.
7. After boot is complete, node sets its state to "Up" and also submits uptime report.
8. updatedAt is updated with time that uptime report was received and status changes to "Up".

At that point the cycle is completed and will repeat. 



### The problematic states of a 3node set with the Farmerbot

These are problematic states:

1. Target is set to "Up" but state and status are "Down" for longer than normal boot time (node isn't responding).
2. Target has been set to "Down" for longer than ~23.5 hours (farmerbot isn't working properly).
3. Target is "Down" but state and status are up (Zos is potentially not responding to power target correctly).
4. State is "Up" but status is "Down" (node shutdown unexpectedly).



### Using the ThreeFold Node Status Bot

You can use the [ThreeFold Node Status Bot](https://t.me/tfnodestatusbot) to see the nodes' status in relation to the Farmerbot.



### CPU overprovisioning

In the context of the ThreeFold grid, overprovisioning a CPU means that you can allocate more than one deployment to one CPU.

In relation to the Farmerbot, you can set a value between 1 and 4 of how much the CPU can be overprovisioned. For example, a value of 2 means that the Farmerbot can allocate up to 2 deployments to one CPU.



### Seed phrase and HEX secret

When setting up the Farmerbot, you will need to enter either the seed phrase or the HEX secret of your farm. For farms created in the TF Connect app, the HEX secret from the app is correct. For farms created in the TF Dashboard, you'll need the seed phrase provided by the Polkadot extension when you created the account.



### Farmerbot directory tree

As a general template, the directory tree of the Farmerbot will look like this:

```
└── farmerbot_docker
    ├── .env
    ├── config
    │   ├── config.md
    │   └── farmerbot.log
    └── docker-compose.yaml
```

Note that the directory tree and its associated files can be created automatically when using the [file creator](./farmerbot_quick.md#create-the-configuration-files).



### Run multiple Farmerbots on the same computer or VM

You can run multiple Farmerbot on the same computer or VM, where each Farmerbot can take care of one farm at time. For example, with two Farmerbots, you could manage two different farms, and so on. In this case, you will need to set different farms in different LANs and set one Farmerbot per farm.

In this case, you need to make sure that each Farmerbot is running in its own directory. We show here a directory tree example with two different Farmerbots running each a docker image.

```
.
├── farmerbot_docker_1
    ├── .env
│   ├── config
│   │   ├── config.md
│   │   └── farmerbot.log
│   └── docker-compose.yaml
└── farmerbot_docker_2
    ├── .env
    ├── config
    │   ├── config.md
    │   └── farmerbot.log
    └── docker-compose.yaml
```

To achieve this, you can simply follow the [Farmerbot Quick Guide](./farmerbot_quick.md) and create a distinct directory for each Farmerbot (`mkdir farmerbot_docker_1`, etc.) and complete the guide for each Farmerbot and farm combination.



### Dedicated Nodes and the Farmerbot

Dedicated nodes are managed like any other node. Nodes marked as dedicated can only be rented completely. Whenever a user wants to rent a dedicated node the user sends a find_node job to the farmerbot. The farmerbot will find such a node, power it on if it is down and reserve the full node (for 30 minutes). The user can then proceed with creating a rent contract for that node. The farmerbot will get that information and keep that node powered on. It will no longer return that node as a possible node in future find_node jobs. Whenever the rent contract is canceled the farmerbot will notice this and shutdown the node if the resource usage allows it.



### Run the Farmerbot on Raspberry Pi

While it is possible to run the Farmerbot on a Pi, this feature is not officially supported by ThreeFold and is experimental. Note that Threefold might never support it officially.

To run the Farmerbot on a Raspberry Pi, read [this guide](https://forum.threefold.io/t/how-to-run-farmerbot-on-a-raspberry-pi/3879/).



### Periodic wakeup

The minimum period between two nodes to be waken up is currently 5 minutes. This means that every 5 minutes a new node wakes up during the periodic wakeup.

Once all nodes are awaken, they all shut down at the same time, except the node that stays awaken to wake up the other during the next periodic wake.



### Time period between random wakeups and power target update

The time period between a random wakeup and the moment the power target is set to down is between 30 minutes and one hour.

Whenever a random wakeup is initiated, the Farmerbot will wait 30 minutes for the node to be up. Once the node is up, the Farmerbot will keep that node up for 30 minutes for the two following reasons:

* The node can send uptime report
* If the node was put online for a given user deployment, this time priod gives ample time for the user to deploy their workload.

This ensures an optimal user experience and reliablity in 3Nodes' reports.

Note that each node managed by the Farmerbot will randomly wakeup on average 10 times a month.



### Farmerbot and UTC time

The Farmerbot works in UTC, independently of the local time of your machine.



## Maintenance

### See the Farmerbot logs

* Go to your farmerbot directory
* Go to config folder
  * ```
    cd config
    ```
* Check logs
  * ```
    cat farmerbot.log
    ```



### See the power state and power target of a 3Node with GraphQL

On [GraphQL](https://graphql.grid.tf/graphql), write the following lines, with the proper farm ID (here we set **1**):

```
query MyQuery {
  nodes(where: {farmID_eq: 1}) {
    power {
      target
      state
    }
    nodeID
  }
}
```



### Change manually the power target of a 3Node

You can use the Polkadot Extrinsics for this.

* Go to the Polkadot.js.org website's endpoint based on the network of your 3Node:
  * [Main net](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ftfchain.grid.tf#/extrinsics)
  * [Test net](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ftfchain.test.grid.tf#/extrinsics)
  * [Dev net](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ftfchain.dev.grid.tf#/extrinsics)
  * [QA net](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ftfchain.qa.grid.tf#/extrinsics)
* Make sure that **Developer -> Extrinsics** is selected
* Select your account
* Select **tfgridModule**
* Select **changepowertarget(nodeId,powerTarget)**
* Select the node you want to change the power target
* Select the power target (**Up** or **Down**)
* Click **Submit Transaction** at the bottom of the page



### Properly reboot the node if power target "Down" doesn't work

* Set the power target to "Down" manually
* Reboot the node and wait for it to set its power state to "Down"
* Once power target and state are both set to "Down", you can manually power off the node and reboot it



### Stop and restart the Farmerbot

Here are the steps to properly stop and restart the Farmerbot.

* Make sure to fully stop the Farmerbot before starting it again:
  * ```
    docker compose rm -f -s -v
    ```

* You should also make sure that there are no containers left from the previous runs. First, list all containers:
  * ```
    docker container ls --all
    ```

* Then delete the remaining containers:
  * ```
    docker container rm -f -v NAME_OF_CONTAINER
    ```

* To start again the Farmerbot, write the following:
  * ```
    docker compose up -d
    ```



### Update the Farmerbot with the new release

Follow these steps to update the Farmerbot with the new release:

* Go to the Farmerbot folder
* Stop the existing Farmerbot
  * ```
    docker compose rm -f -s -v
    ```
* Make a copy of the Farmerbot log file
  * ```
    cp config/farmerbot.log config/farmerbot.log.archive
    ```
* Remove the docker-compose file of the previous Farmerbot release
  * ```
    rm docker-compose.yaml
    ```
* Download the new docker-compose file
  * ```
    wget https://raw.githubusercontent.com/threefoldtech/farmerbot/development/docker-compose.yaml
    ```
* Run the new Farmerbot
  * ```
    docker compose up -d
    ```

This last command can take some time as it is downloading new docker images. Let the Farmerbot run for some time. If you think something is wrong, or if you want to check if there is something wrong, you should look into the **config/farmerbot.log** file. If you see some errors please contact [ThreeFold Support](https://threefoldfaq.crisp.help/en/).



### Add a 3Node to a running Farmerbot

If the Farmerbot is running and you want to add a new 3Node to your farm, you will need to [stop and restart the Farmerbot](#stop-and-restart-the-farmerbot) once the new 3Node is connected to the TFGrid.



## Troubleshooting

### Retrieve the Farmerbot log after receiving the error: "Error grabbing logs"

If the farmerbot logs are corrupted, you can retrieve them with the following method.

You will need to find and grab the whole log file from the docker backend. Here are the general steps:

* In the terminal, write the following command:
  * ```
    docker ps -a
    ```
* Look for the container named `xxxx-farmerbot-x` (the name can differ in your situation).  
  * If there are more than one, take the one that's either running or most recently exited. 
* Then find where its log file is. Here's an example with `main-farmerbot-1`. Make sure to adjust the line with your container name:
  * ```
    docker inspect main-farmerbot-1 | grep LogPath
    ```
  * The output given will look like this `/var/lib/docker/containers/...`. This is the path to the json formatted log file.
* You can then copy and inspect the json formatted log file.
  * ```
    sudo cp /path/to/json_formatted_log_file /destination/path
    ```



### Fix the error: "WebSocket protocol error: Connection reset without closing handshake"

To fix this error, make sure that you are only running one instance of the Farmerbot.



### Fix the error: "Balance is not enough to apply an extrinsic"

This error means that you do not have sufficient funds (TFT) in your wallet for the Farmerbot's fees.

You thus simply need to add some TFTs in the wallet that is connected to the farm on which you are running the Farmerbot. For example, 1 TFT can suffice for many transactions. For more information, read [this documentation](./farmerbot_quick.html#farmerbot-costs-on-the-tfgrid).



### Fix the error: "Error: Invalid twin id. Twin id must be postive integer"

This indicates that the seed phrase has no associated twin. There can be many reasons behind this. 

- You are using the wrong seed phrase for your farm.
  - To fix it, simply find the proper seed phrase for the farm hosting your 3Nodes.
- You created the farm in the TF Connect app and are using the seed phrase in words instead of the seed phrase in HEX format (the TFChain secret).
  - To fix it, simply use the TFChain secret (HEX format) in the TF Connect app.



### Fix the error: "Dependency failed to start: container qa-redis-1 is unhealthy"

This means that there is some redis database state stored in a persistent volume. The issue is that the database got corrupted somehow and thus redis is crashing.

To remove the volume, and thus actually get a clean start, you can use the following command:
```
docker compose down -v
```



### Fix the error: "Node xxx is not responding while we expect it to: timeout on blpop"

This error happens when you start the Farmerbot while the nodes are down. Although this is not an issue, it is recommended to have the nodes running when starting the Farmerbot. The nodes data will then be up to date and the nodes that are allowed to be shut down will be shut down.



### Fix the error: "Failed initializing the database: Invalid duration value"

If you see this error, it's because you've used 24h time format in conjunction with AM/PM time format. Note that if you add AM/PM, the Farmerbot will use the 12h time format (AM/PM). Otherwise, it is the 24h time format.



### Fix the error: "Invalid characters for a local volume name... If you intended to pass a host directory, use absolute path."

If you see this error, simply make sure that you are using the absolute path. Here is an example using `$(pwd)` to pass the absolute path:

```
docker run --name fbot_config_container -v $(pwd):/farmerbot -ti ghcr.io/threefoldtech/farmerbot_config:0.2.0
```



## Questions and Feedback

If you have questions concerning the Farmerbot, feel free to ask for help on the [ThreeFold Forum](https://forum.threefold.io/) or on the [ThreeFold Farmer chat](https://t.me/threefoldfarmers).