````motoko
import D "mo:base/Debug";

let a = -100;

let isInRange = a >= 0 and a <= 100;

if (isInRange) {
  D.print("a is in range");
};

D.print("isInRange: " # debug_show(isInRange));```
````
