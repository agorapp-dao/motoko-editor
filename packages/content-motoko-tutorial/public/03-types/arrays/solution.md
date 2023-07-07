```motoko
import D "mo:base/Debug";

var fruits = ["apple", "banana", "cherry"];
fruits[1] := "pear";

D.print("Array: " # debug_show(fruits));
D.print("Array size: " # debug_show(fruits.size()));
```
