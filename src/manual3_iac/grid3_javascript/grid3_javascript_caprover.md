!!!include:grid3_javascript_loadclient

## Deploying Caprover Leader Node

### Example code

!!!code url:https://github.com/threefoldtech/grid3_client_ts/blob/development/scripts/caprover_leader.ts



### Detailed explanation

So this deployment is almost similiar to what we have in the [vm deployment section](grid3_javascript_vm). We only have different environment variables


###### Env. variables in Leader Node
- PUBLIC_KEY: Your public IP to be able to access the VM.
- SWM_NODE_MODE: Caprover Node type which must be `leader` as we are deploying a leader node.
- CAPROVER_ROOT_DOMAIN: The domain which you we will use to bind the deployed VM.
- DEFAULT_PASSWORD: Caprover default password you want to deploy with.


For further details about Leader node deployment please [check](https://github.com/freeflowuniverse/freeflow_caprover#a-leader-node-deploymentsetup)


## Deploying Caprover Worker Node

### Example code

!!!code url:https://github.com/threefoldtech/grid3_client_ts/blob/development/scripts/caprover_worker.ts


Before worker node deployment:
 - Get token from the leader node
 - Get leader node public IP

  For futher inforamtion please [check](https://github.com/freeflowuniverse/freeflow_caprover#step-4-access-the-captain-dashboard)


to deploy a worker Node it has the same details as a leader node regarding the deployment details except environment variables.

###### Env. variables in worker Node
- PUBLIC_KEY: Your public IP to be able to access the VM.
- SWM_NODE_MODE: Caprover Node type which must be `worker` as we are deploying a worker node.
- SWMTKN: Token generated on the leader node to allow the worker node to join the docker swarm network 
- LEADER_PUBLIC_IP: Leader node public IP.
