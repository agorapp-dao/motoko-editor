```motoko
import D "mo:base/Debug";
import Buffer "mo:base/Buffer";

let cities = Buffer.Buffer<Text>(3);
cities.add("London");
cities.add("Paris");
cities.add("Tokyo");
cities.add("New York");

D.print("buffer size: " # debug_show(cities.size()));
D.print("buffer capacity: " # debug_show(cities.capacity()));

let citiesArray = Buffer.toArray(cities);
D.print("buffer capacity: " # debug_show(citiesArray));
```
