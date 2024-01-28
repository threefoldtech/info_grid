# QSFS getting started on ubuntu setup

## Get components

The following steps can be followed to set up a qsfs instance on a fresh
ubuntu instance.

- Install the fuse kernel module (`apt-get update && apt-get install fuse3`)
- Install the individual components, by downloading the latest release from the
    respective release pages:
  - 0-db-fs: https://github.com/threefoldtech/0-db-fs/releases
  - 0-db: https://github.com/threefoldtech/0-db, if multiple binaries
        are available in the assets, choose the one ending in `static`
  - 0-stor: https://github.com/threefoldtech/0-stor_v2/releases, if
        multiple binaries are available in the assets, choose the one
        ending in `musl`
- Make sure all binaries are executable (`chmod +x $binary`)

## Setup and run 0-stor

There are instructions below for a local 0-stor configuration. You can also deploy an eVDC and use the [provided 0-stor configuration](evdc_storage) for a simple cloud hosted solution.

We will run 6 0-db instances as backends for 0-stor. 4 are used for the
metadata, 2 are used for the actual data. The metadata always consists
of 4 nodes. The data backends can be increased. You can choose to either
run 7 separate 0-db processes, or a single process with 7 namespaces.
For the purpose of this setup, we will start 7 separate processes, as
such:

> This assumes you have moved the download 0-db binary to `/tmp/0-db`

```bash
/tmp/0-db --background --mode user --port 9990 --data /tmp/zdb-meta/zdb0/data --index /tmp/zdb-meta/zdb0/index
/tmp/0-db --background --mode user --port 9991 --data /tmp/zdb-meta/zdb1/data --index /tmp/zdb-meta/zdb1/index
/tmp/0-db --background --mode user --port 9992 --data /tmp/zdb-meta/zdb2/data --index /tmp/zdb-meta/zdb2/index
/tmp/0-db --background --mode user --port 9993 --data /tmp/zdb-meta/zdb3/data --index /tmp/zdb-meta/zdb3/index

/tmp/0-db --background --mode seq --port 9980 --data /tmp/zdb-data/zdb0/data --index /tmp/zdb-data/zdb0/index
/tmp/0-db --background --mode seq --port 9981 --data /tmp/zdb-data/zdb1/data --index /tmp/zdb-data/zdb1/index
/tmp/0-db --background --mode seq --port 9982 --data /tmp/zdb-data/zdb2/data --index /tmp/zdb-data/zdb2/index
```

Now that the data storage is running, we can create the config file for
0-stor. The (minimal) config for this example setup will look as follows:

```toml
minimal_shards = 2
expected_shards = 3
redundant_groups = 0
redundant_nodes = 0
socket = "/tmp/zstor.sock"
prometheus_port = 9100
zdb_data_dir_path = "/tmp/zdbfs/data/zdbfs-data"
max_zdb_data_dir_size = 25600

[encryption]
algorithm = "AES"
key = "000001200000000001000300000004000a000f00b00000000000000000000000"

[compression]
algorithm = "snappy"

[meta]
type = "zdb"

[meta.config]
prefix = "someprefix"

[meta.config.encryption]
algorithm = "AES"
key = "0101010101010101010101010101010101010101010101010101010101010101"

[[meta.config.backends]]
address = "[::1]:9990"

[[meta.config.backends]]
address = "[::1]:9991"

[[meta.config.backends]]
address = "[::1]:9992"

[[meta.config.backends]]
address = "[::1]:9993"

[[groups]]
[[groups.backends]]
address = "[::1]:9980"

[[groups.backends]]
address = "[::1]:9981"

[[groups.backends]]
address = "[::1]:9982"
```

> A full explanation of all options can be found in the 0-stor readme:
https://github.com/threefoldtech/0-stor_v2/#config-file-explanation

This guide assumes the config file is saved as `/tmp/zstor_config.toml`.

Now `zstor` can be started. Assuming the downloaded binary was saved as
`/tmp/zstor`:

`/tmp/zstor -c /tmp/zstor_config.toml monitor`. If you don't want the
process to block your terminal, you can start it in the background:
`nohup /tmp/zstor -c /tmp/zstor_config.toml monitor &`.

## Setup and run 0-db

First we will get the hook script. The hook script can be found in the
[quantum_storage repo on github](https://github.com/threefoldtech/quantum-storage).
A slightly modified version is found here:

```bash
#!/usr/bin/env bash
set -ex

action="$1"
instance="$2"
zstorconf="/tmp/zstor_config.toml"
zstorbin="/tmp/zstor"

if [ "$action" == "ready" ]; then
    ${zstorbin} -c ${zstorconf} test
    exit $?
fi

if [ "$action" == "jump-index" ]; then
    namespace=$(basename $(dirname $3))
    if [ "${namespace}" == "zdbfs-temp" ]; then
        # skipping temporary namespace
        exit 0
    fi

    tmpdir=$(mktemp -p /tmp -d zdb.hook.XXXXXXXX.tmp)
    dirbase=$(dirname $3)

    # upload dirty index files
    for dirty in $5; do
        file=$(printf "i%d" $dirty)
        cp ${dirbase}/${file} ${tmpdir}/
    done

    ${zstorbin} -c ${zstorconf} store -s -d -f ${tmpdir} -k ${dirbase} &

    exit 0
fi

if [ "$action" == "jump-data" ]; then
    namespace=$(basename $(dirname $3))
    if [ "${namespace}" == "zdbfs-temp" ]; then
        # skipping temporary namespace
        exit 0
    fi

    # backup data file
    ${zstorbin} -c ${zstorconf} store -s --file "$3"

    exit 0
fi

if [ "$action" == "missing-data" ]; then
    # restore missing data file
    ${zstorbin} -c ${zstorconf} retrieve --file "$3"
    exit $?
fi

# unknown action
exit 1
```

> This guide assumes the file is saved as `/tmp/zdbfs/zdb-hook.sh. Make sure the
> file is executable, i.e. chmod +x /tmp/zdbfs/zdb-hook.sh`

The local 0-db which is used by 0-db-fs can be started as follows:

```bash
/tmp/0-db \
    --index /tmp/zdbfs/index \
    --data /tmp/zdbfs/data \
    --datasize 67108864 \
    --mode seq \
    --hook /tmp/zdbfs/zdb-hook.sh \
    --background
```

## Setup and run 0-db-fs

Finally, we will start 0-db-fs. This guides opts to mount the fuse
filesystem in `/mnt`. Again, assuming the 0-db-fs binary was saved as
`/tmp/0-db-fs`:

```bash
/tmp/0-db-fs /mnt -o autons -o background
```

You should now have the qsfs filesystem mounted at `/mnt`. As you write
data, it will save it in the local 0-db, and it's data containers will
be periodically encoded and uploaded to the backend data storage 0-db's.
The data files in the local 0-db will never occupy more than 25GiB of
space (as configured in the 0-stor config file). If a data container is
removed due to space constraints, and data inside of it needs to be
accessed by the filesystem (e.g. a file is being read), then the data
container is recovered from the backend storage 0-db's by 0-stor, and
0-db can subsequently serve this data to 0-db-fs.

### 0-db-fs limitation

Any workload should be supported on this filesystem, with some exceptions:

- Opening a file in 'always append mode' will not have the expected behavior
- There is no support of O_TMPFILE by fuse layer, which is a feature required by
  overlayfs, thus this is not supported. Overlayfs is used by Docker for example.

## docker setup

It is possible to run the zstor in a docker container. First, create a data directory
on your host. Then, save the config file in the data directory as `zstor.toml`. Ensure
the storage 0-db's are running as desribed above. Then, run the docker container
as such: 

```
docker run -ti --privileged --rm --network host --name fstest -v /path/to/data:/data -v /mnt:/mnt:shared azmy/qsfs
```

The filesystem is now available in `/mnt`.

## Autorepair

Autorepair automatically repairs object stored in the backend when one or more shards
are not reachable anymore. It does this by periodically checking if all the backends
are still reachable. If it detects that one or more of the backends used by an encoded
object are not reachable, the healthy shards are downloaded, the object is restored
and encoded again (possibly with a new config, if it has since changed), and uploaded
again.

Autorepair does not validate the integrity of individual shards. This is protectected
against by having multiple spare (redundant) shards for an object. Corrupt shards
are detected when the object is rebuild, and removed before attempting to rebuild.
Autorepair also does not repair the metadata of objects.

## Monitoring, alerting and statistics

0-stor collects metrics about the system. It can be configured with a 0-db-fs mountpoint,
which will trigger 0-stor to collect 0-db-fs statistics, next to some 0-db statistics
which are always collected. If the `prometheus_port` config option is set, 0-stor
will serve metrics on this port for scraping by prometheus. You can then set up
graphs and alerts in grafana. Some examples include: disk space used vs available
per 0-db backend, total entries in 0-db backends, which backends are tracked, ...
When 0-db-fs monitoring is enabled, statistics are also exported about the filesystem
itself, such as read/write speeds, syscalls, and internal metrics

For a full overview of all available stats, you can set up a prometheus scraper against
a running instance, and use the embedded promQl to see everything available.

## Data safety

As explained in the auto repair section, data is periodically checked and rebuild if
0-db backends become unreachable. This ensures that data, once stored, remains available,
as long as the metadata is still present. When needed, the system can be expanded with more
0-db backends, and the encoding config can be changed if needed (e.g. to change encryption keys).

## Performance

Qsfs is not a high speed filesystem, nor is it a distributed filesystem. It is intended to
be used for archive purposes. For this reason, the qsfs stack focusses on data safety first.
Where needed, reliability is chosen over availability (i.e. we won't write data if we can't
guarantee all the conditions in the required storage profile is met).

With that being said, there are currently 2 limiting factors in the setup:
- speed of the disk on which the local 0-db is running
- network

The first is the speed of the disk for the local 0-db. This imposes a hard limit on
the throughput of the filesystem. Performance testing has shown that write speeds
on the filesystem reach performance of roughly 1/3rd of the raw performance of the
disk for writing, and 1/2nd of the read performance. Note that in the case of _very_
fast disks (mostly NVMe SSD's), the cpu might become a bottleneck if it is old and
has a low clock speed. Though this should not be a problem.

The network is more of a soft cap. All 0-db data files will be encoded and distributed
over the network. This means that the upload speed of the node needs to be able to
handle this data througput. In the case of random data (which is not compressable),
the required upload speed would be the write speed of the 0-db-fs, increased by the
overhead generated by the storage policy. There is no feedback to 0-db-fs if the upload
of data is lagging behind. This means that in cases where a sustained high speed write
load is applied, the local 0-db might eventually grow bigger than the configured size limit
until the upload managed to catch up. If this happens for prolonged periods of time, it
is technically possible to run out of space on the disk. For this reason, you should
always have some extra space available on the disk to account for temprorary cache
excess.

When encoded data needs to be recovered from backend nodes (if it is not in cache),
the read speed will be equal to the connection speed of the slowest backend, as all
shards are recovered before the data is build. This means that recovery of historical
data will generally be a slow process. Since we primarily focus on archive storage,
we do not consider this a priority.
