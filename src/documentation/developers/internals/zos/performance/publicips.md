<h1> Public IPs Validation Task </h1>

## Introduction

The goal of the task is to make sure public IPs assigned to a farm are valid and can be assigned to deployments.

## Configuration

- Name: `public-ip-validation`
- Schedule: 4 times a day
- Jitter: 10 min

## Task Details

- The task depends on `Networkd` ensuring the proper test network setup is correct and will fail if it wasn't setup properly. The network setup consists of a test Namespace and a MacVLAN as part of it. All steps are done inside the test Namespace.
- Decide if the node should run the task or another one in the farm based on the node ID. The node with the least ID and with power target as up should run it. The other will log why they shouldn't run the task and return with no errors. This is done to ensure only one node runs the task to avoid problems like assigning the same IP.
- Get public IPs set on the farm.
- Remove all IPs and routes added to the test MacVLAN to ensure any remaining from previous task run are removed.
- Skip IPs that are assigned to a contract.
- Set the MacVLAN link up.
- Iterate over all public IPs and add them with the provided gateway to the MacVLAN.
- Validate the IP by querying an external source that return the public IP for the node.
- If the public IP returned matches the IP added in the link, then the IP is valid. Otherwise, it is invalid.
- Remove all IPs and routes between each IP to make them available for other deployments.
- After iterating over all public IPs, set the link down.

## Result

The task only returns a single map of String (IP) to IPReport. The report consists of the IP state (valid, invalid or skipped) and the reason for the state.

### Result Sample

```json
{
  "description": "Runs on the least NodeID node in a farm to validate all its IPs.",
  "name": "public-ip-validation",
  "result": {
    "185.206.122.29/24": {
      "reason": "public ip or gateway data are not valid",
      "state": "invalid"
    }
  },
  "timestamp": 1700504421
}
```