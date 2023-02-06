```vlang
mut tfgrid := tfgriddb.tfgrid_new() ?

entities := tfgrid.entity_list() ?
println(entities)

entity := tfgrid.entity_get_by_id(1) ?
print(entity)

twins := tfgrid.twin_list() ?
println(twins)

twin := tfgrid.twin_get_by_id(1) ?
print(twin)

nodes := tfgrid.nodes_list() ?
println(nodes)

node := tfgrid.nodes_get_by_id(1) ?
print(node)

farms := tfgrid.farms_list() ?
println(farms)

farm := tfgrid.farm_get_by_id(1) ?
print(farm)

nodes_by_resources := tfgrid.nodes_list_by_resource(1, 1, 500, 1) ?
println(nodes_by_resources)

countries := tfgrid.countries_list() ?
println(countries)

// Search for country belgium
countries_by_name_substring := tfgrid.countries_by_name_substring('elgium') ?
println(countries_by_name_substring)

country_by_id := tfgrid.country_by_id(65) ?
println(country_by_id)

cities := tfgrid.cities_list() ?
println(cities)

// Search for cities with substring "hent"
cities_by_name_substring := tfgrid.cities_by_name_substring('hent') ?
println(cities_by_name_substring)

city_by_id := tfgrid.city_by_id(65) ?
println(city_by_id)

cities_by_country_id := tfgrid.cities_by_country_id(65) ?
println(cities_by_country_id)
```

>TODO: explain more, make sure code in the vgrid repo works

## Example: nodes by capacity

```v
import tfgriddb
import os 
fn get_nodes_by_capacity(sru u64, cru u64, hru u64, mru u64)? {
	mut tfgrid := tfgriddb.tfgrid_new() ?
  	mut nodes_by_capacity := tfgrid.nodes_list_by_resource(sru,cru,hru,mru)?
	println(nodes_by_capacity)
}
fn main(){
	//Default value used in intializing the resources
	mut default_val := '0'.u64()
	mut sru := default_val
	mut cru := default_val
	mut hru := default_val
	mut mru := default_val
	
	if "--help" in os.args {
		println("This method to get nodes by city or country or both \n
		--sru 		nodes selected should have a minumum value of sru (ssd resource unit) equal to this  (optional) \n
		--cru 		nodes selected should have a minumum value of cru (core resource unit) equal to this  (optional) \n
		--hru 		nodes selected should have a minumum value of hru (hd resource unit) equal to this  (optional) \n
		--mru   	nodes selected should have a minumum value of mru (memory resource unit) equal to this (optional) ")
		return
	}
	if "--sru" in os.args {
		mut index_val := os.args.index("--sru")
		sru = os.args[index_val+1].u64()
	}
	
	if "--cru" in os.args {
		mut index_val := os.args.index("--cru")
		cru = os.args[index_val+1].u64()
	}
	
	if "--hru" in os.args {
		mut index_val := os.args.index("--hru")
		hru = os.args[index_val+1].u64()
	}
	
	if "--mru" in os.args {
		mut index_val := os.args.index("--mru")
		mru = os.args[index_val+1].u64()
	}
  	
get_nodes_by_capacity(sru, cru, hru, mru) or { return }
}

```


## Example: nodes by city/country

```v
import tfgriddb
import os 
fn get_nodes_by_city_country(geo_location tfgriddb.GeoLocation) ? {
	mut tfgrid := tfgriddb.tfgrid_new() ?
  	mut nodes_by_country_city := tfgrid.nodes_by_country_city(geo_location)?
	println(nodes_by_country_city)
}
fn main(){
	mut geo_location := tfgriddb.GeoLocation{}
	mut city_name := ""
	mut country_name := ""
	if "--help" in os.args {
		println("This method to get nodes by city or country or both \n
		--city 		name of the city  (optional) \n
		--country 	name of the country (optional) ")
		return
	}
	if "--city" in os.args {
		mut index_val:=os.args.index("--city")
		city_name = os.args[index_val+1]
		geo_location.city_name = city_name


	}
	if "--country" in os.args {
		mut index_val:=os.args.index("--country")
		country_name = os.args[index_val+1]
		geo_location.country_name = country_name

	}
	if city_name == "" && country_name == ""{
		println("Please specify a city or country name")
		return
	}

  	
get_nodes_by_city_country(geo_location) or {return }
}
```


## Example: nodes by location

```v
import tfgriddb
import os 
fn get_nodes_by_location(latitude string,longitude string) ? {
	mut tfgrid := tfgriddb.tfgrid_new() ?
	mut nodes_by_location := tfgrid.nodes_by_location(latitude,longitude)?
	println(nodes_by_location)
}
fn main(){
	mut latitude:=""
	mut longitude:=""
	if "--help" in os.args {
		println("This method to get nodes by location including latitude and longitude \n
		--latitude value (required) \n
		--longitude value (required) ")
		return
	}
	if "--latitude" in os.args {
		mut index_val:=os.args.index("--latitude")
		latitude = os.args[index_val+1]

	}else{
		println("--latitude is required")
		return
	}
	if "--longitude" in os.args {
		mut index_val:=os.args.index("--longitude")
		longitude = os.args[index_val+1]

	}else{
		println("--longitude is required")
		return
	}

get_nodes_by_location(latitude,longitude) or {return }
}
```

.

