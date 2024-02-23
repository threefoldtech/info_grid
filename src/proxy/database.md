<h1>Database</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Max Open Connections](#max-open-connections)

***

## Introduction

The grid proxy has access to a postgres database containing information about the tfgrid, specifically information about grid nodes, farms, twins, and contracts.\
The database is filled/updated by this [indexer](https://github.com/threefoldtech/tfchain_graphql).
The grid proxy mainly retrieves information from the db with a few modifications for efficient retrieval (e.g. adding indices, caching node gpus, etc..).

## Max Open Connections

The postgres database can handle 100 open connections concurrently (that is the default value set by postgres), this number can be increased, depending on the infrastructure, by modifying it in the postgres.conf file where the db is deployed, or by executing the following query `ALTER system SET max_connections=size-of-connection`, but this requires a db restart to take effect.\
The explorer creates a connection pool to the postgres db, with a max open pool connections set to a specific number (currently 80).\
It's important to distinguish between the database max connections, and the max pool open connections, because if the pool did not have any constraints, it would try to open as many connections as it wanted, without any notion of the maximum connections the database accepts. It's the database responsibility then to accept or deny the connection.\
This is why the max number of open pool connections is set to 80: It's below the max connections the database could handle (100), and it gives room for other actors outside of the explorer to open connections with the database.\
