<h1> Calculate the Farming Costs: Power, Internet and Total Costs</h1>

<h2> Table of Contents </h2>

- [Calculate the Total Electricity Cost of Your Farm](#calculate-the-total-electricity-cost-of-your-farm)
- [Calculate the Proper Bandwidth Needed for Your Farm](#calculate-the-proper-bandwidth-needed-for-your-farm)
  - [The Minimum Bandwidth per 3Node Equation](#the-minimum-bandwidth-per-3node-equation)
  - [Cost per Month for a Given Bandwidth](#cost-per-month-for-a-given-bandwidth)
- [Calculate Total Cost and Revenue](#calculate-total-cost-and-revenue)
  - [Check Revenue with the ThreeFold Simulator](#check-revenue-with-the-threefold-simulator)
  - [Economics of Farming](#economics-of-farming)
- [Questions and Feedback](#questions-and-feedback)

***

## Calculate the Total Electricity Cost of Your Farm

The total electricity cost of your farm is the sum of all Power used by your system times the price you pay for each kWh of power.

> Total electricity cost = Total Electricity in kWh * Cost per kWh

> Total Electricty in kWh = 3Nodes' electricity consumption * Number of 3Nodes + Cooling system electricity consumption

With our example, we have 5 servers running at 400 W at Full Load and we have a 12K BTU unit that is consuming in average 1000W. 

We would then have:

> 5 * 400 W + 1000 W = 3000 W = 3 kW

To get the kWh per day we simply multiply by 24. 

> kW * (# of hour per day) = daily kWh consumption

> 3 kW * 24 = 72 kWh / day

We thus have 72 kWH per day. For 30 days, this would be 

> kWh / day * (# day in a month) = kWh per month

> 72 * 30 = 2160 kWH / month.  

At a kWh price of 0.10$ USD, we have a cost of 216 $USD per month for the electricity bill of our ThreeFold farm.

> kWH / month of the farm * kWh Cost = Electricity Bill per month for the farm

> 2160 * 0.1 = 216$USD / month for electricity bills


## Calculate the Proper Bandwidth Needed for Your Farm

The bandwidth needed for a given 3Node is not yet set in stone and you are welcome to participate in ongoing [discussion on this subject](https://forum.threefold.io/t/storage-bandwidth-ratio/1389) on the ThreeFold Forum.

In this section, we will give general guidelines. The goal is to have a good idea of what constitutes a proper bandwidth available for a given amount of resources utilized on the ThreeFold Grid.

Starting with a minimum of 1 mbps per Titan, which is 1 TB SSD and 32 GB RAM, we note that this is the lowest limit that gives the opportunity for the most people possible to join the ThreeFold Grid. That being said, we could set that 10 mbps is an acceptable upper limit for 1 TB SSD and 64 GB of RAM. 

Those numbers are empirical and more information will be shared in the future. The ratio 1TB SSD/64GB RAM is in tune with the optimal TFT rewards ratio. It is thus logical to think that farmers will build 3Node based on this ratio. Giving general bandwidth guidelines based on this ratio unit could thus be efficient for the current try-and-learn situation. 

### The Minimum Bandwidth per 3Node Equation


Here we explore some equations that can give a general idea to farmers of the bandwidth needed for their farms. As stated, this is not yet set in stones and the TFDAO will need to discuss and clarify those notions.

Here is a general equation that gives you a good idea of a correct bandwidth for a 3Node:

> min Bandwidth per 3Node (mbps) = k * max((Total SSD TB / 1 Tb),(Total Threads / 8 Threads),(Total GB / 64 GB)) + k * (Total HDD TB / 2)

Setting k = 10 mbps, we have:

> min Bandwidth per 3Node (mbps) = 10 * max((Total SSD TB / 1 TB),(Total Threads / 8 Threads),(Total GB / 64 GB)) + 10 * (Total HDD TB / 2)

As an example, a Titan, with 1TB SSD, 8 Threads and 64 GB of RAM, would need 10 mbps:

> 10 * max(1, 1, 1) = 10 * 1 = 10

With the last portion of the equation, we can see that for each additional 1TB HDD storage, you would need to add 5 mbps of bandwidth.


Let's take a big server as another example. Say we have a server with 5TB SSD, 48 threads and 384 GB of RAM. We would then need 60 mbps of bandwidth for each of these 3Nodes:

> 10 * max((5/5), (48/8), (384/64)) = 10 * max(5,6,6) = 10 * 6 = 60

This server would need 60 mbps minimum to account for a full TF Grid utilization.

You can easily scale this equation if you have many 3Nodes.



Let's say you have a 1 gbps bandwidth from your Internet Service Provider (ISP). How much of those 3Nodes could your farm have?

> Floor (Total available bandwidth / ((Bandwidth needed per 3Nodes)) = Max servers possible

With our example we have:

> 1000 / 60 = 16.66... = 16

We note that the function Floor takes the integer without the decimals.

Thus, a 1 gbps bandwidth farm could have 16 3Nodes with each 5TB SSD, 48 threads and 384 GB of RAM.



In this section, we used **k = 10 mbps**. If you follow those guidelines, you will most probably have a decent bandwidth for your ThreeFold farm. For the time being, the goal is to have farmers building ThreeFold farms and scale them reasonably with their available bandwidth. 

Stay tuned for official bandwidth parameters in the future.



### Cost per Month for a Given Bandwidth

Once you know the general bandwidth needed for your farm, you can check with your ISP the price per month and take this into account when calculating your monthly costs.

Let's take the example we used with 5 servers with 400 W at Full Load. Let's say these 5 servers have the same parameters we used above here. We then need 60 gbps per 3Nodes. This means we need 300 mbps. For the sake of our example, let's say this is around 100$ USD per month.


## Calculate Total Cost and Revenue


As the TFT price is fixed for 60 months when you connect your 3Node for the first time on the TF Grid, we will use the period of 60 months, or 5 years, to calculate the total cost and revenue.

The total cost is equal to:

> Total Cost = Initial investment + 60 * (electricity + Internet costs per month)

In our example, we can state that we paid each server 1500$ USD and that they generate each 3000 TFT per month, with an entry price of 0.08$ USD per TFT. 

The electricity cost per month is 

> 144$ for the electricity bill
> 
> 100$ for the Internet bill
> 
> Total : 244 $ monthly cost for electricity and Internet

The revenues are

> Revenues per month = Number of 3Nodes * TFT farmed per 3Node * Price TFT Sold

In this example, we have 5 servers generating 2000 TFT per month at 0.08$ USD per TFT:

> 5 * 3000$ * 0.08$ = 1200$

The net revenue per month are thus equal to 

> Net Revenue = Gross revenue - Monthly cost.

We thus have 

> 1200$ - 244$ = 956$

This means that we generate a net profit of 956$ per month, without considering the initial investment of building the 3Nodes for the farm.

In the previous AC example, we calculate that a minimum of 12K BTU was needed for the AC system. Let's say that this would mean buying a 350$ USD 12k BTU AC unit.

The initial cost is the cost of all the 3Nodes plus the AC system.

> Number of 3Nodes * cost per 3Nodes + Cost of AC system = Total Cost

In this case, it would be:

> Total initial investment = Number of 3Nodes * Cost of 3Node + Cost of AC system

Then we'd have:

> 5 * 1500 + 350 = 7850 $

Thus, a more realistic ROI would be:

> Total initial investment / Net Revenue per Month = ROI in months

In our case, we would have:

> 7850$ / 956$ = Ceiling(8.211...) = 9

With the function Ceiling taking the upper integer, without any decimals.

Then within 9 months, this farm would have paid itself and from now on, it would be only positive net revenue of 956$ per month.

We note that this takes into consideration that we are using the AC system 24/7. This would surely not be the case in real life. This means that the real ROI would be even better. It is a common practice to do estimates with stricter parameters. If you predict being profitable with strict parameters, you will surely be profitable in real life, even when "things" happen and not everything goes as planned. As always, this is not financial advice.

We recall that in the section [Calculate the ROI of a DIY 3Node](./calculate_roi.md), we found a simpler ROI of 6.25 months, say 7 months, that wasn't taking into consideration the additional costs of Internet and electricity. We now have a more realistic ROI of 9 months based on a fixed TFT price of 0.08$ USD. You will need to use to equations and check with your current TF farm and 3Nodes, as well as the current TFT market price.


### Check Revenue with the ThreeFold Simulator

To know how much TFT you will farm per month for a giving 3Node, the easiest route is to use the [ThreeFold Simulator](https://simulator.grid.tf/). You can do predictions of 60 months as the TFT price is locked at the TFT price when you first connect your 3Node, and this, for 60 months.

To know the details of the calculations behind this simulator, you can read [this documentation](https://library.threefold.me/info/threefold#/tfgrid/farming/threefold__farming_reward).


### Economics of Farming

As a brief synthesis, the following equations are used to calculate the total revenues and costs of your farm.

```
- Total Monthly Cost = Electricity cost + Internet Cost
- Total Electricity Used = Electricy per 3Node * Number of 3Node + Electricity for Cooling
- Total Monthly Revenue = TFT farmed per 3 node * Number of 3Nodes * TFT price when sold
- Initial Investment = Price of farm (3Nodes) + Price of AC system
- Total Return on investment = (60 * Monthly Revenue) - (60 * Monthly cost) - Initial Investment
```


## Questions and Feedback

This section constitutes a quick synthesis of the costs and revenues when running a ThreeFold Farm. As always, do your own reseaerch and don't hesitate to visit the [ThreeFold Forum](https://forum.threefold.io/) on the [ThreeFold Telegram Farmer Group](https://t.me/threefoldfarmers) if you have any questions.
