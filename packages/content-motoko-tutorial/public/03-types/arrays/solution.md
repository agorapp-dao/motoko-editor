```motoko
import D "mo:base/Debug";
import Array "mo:base/Array";

var fruits = ["apple", "banana", "cherry"];
// TODO: `Array.append` copies its arguments and has linear complexity;
fruits := Array.append(fruits, ["dragonfruit"]);

D.print("Array: " # debug_show(fruits));
D.print("Array size: " # debug_show(fruits.size()));
```
