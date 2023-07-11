```motoko
import D "mo:base/Debug";

// your code goes here
func subtract(a : Int, b : Int) : Int {
    a - b
};

let diff = subtract(10, 6);

D.print("Difference: " # debug_show(diff));
```
