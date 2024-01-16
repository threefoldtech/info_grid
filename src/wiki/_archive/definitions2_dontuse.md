

# ThreeFold Farming

# ThreeFold Resource Pools

![https://docs.google.com/drawings/d/1K1LuYRkD12QwIoZ-AduV-X_RxT1J5nUVt3D5vmerUUk/edit](https://docs.google.com/drawings/d/e/2PACX-1vT-dPplNVaQ1-3oWxrjvVsOjoDrdDZrb2t05BQ0WpFU02PucD_TC4cX5-lcdfxzodDJwwcjPgjYGyyP/pub?w=1440&h=810)

## Resource Pool (RP)

Is available capacity in a ThreeFold Farming Pool.
There are typically more than 1 Resource Pool in a Farming Pool and Resource Pools can span multiple Farming Pools.

A Resource Pool is linked to a User, a User is paying tokens for using the IT Capacity.
A Farming Pool is linked to a Farmer, the Farmer receives tokens for providing the IT Capacity.

## Resource Units (RU)

Units of IT capacity as used in a RP, starting from hardware level. More info see .

| unit type | description | code |
| --- | --- | --- |
| core unit     | 1 logical core (hyperthreaded core) | CRU |
| mem unit      | 1 GB mem	| MRU |
| hd unit       | 1 TB | HRU |
| ssd unit      | 1 GB	 | SRU |
| network unit  | 1 GB of bandwidth transmitted in/out	| NRU |

These are raw capacities as measured by our TF Software.

## Resource Bundle (always per TFNode) (Bundle)

- is x number of resource units bundled
- a Resource Bundle is always per TFNode
- e.g. resource bundel type A = 1 cpu unit + 2 mem unit + 3 hd unit + 1 ssd unit
- the resource bundles are defined by the Farmers, its basically a unit of capacity sold. Users cannot buy individual Resource Units, Users buy Resource Bundles by transfering TFT.

## Resource Reservation (Reservation)

- a reservation for X nr of Resource Bundles
- a reservation is the contract between the User and the Farmer
- has a starting date / end date
- has a price linked to it
- a Resource Pool is made up out of X nr of Resource Bundles.

