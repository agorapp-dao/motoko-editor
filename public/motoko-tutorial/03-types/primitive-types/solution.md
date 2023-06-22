The issue with the code is that the variable `a` is inferred to be of type `Nat`. This type does
not allow negative values. To fix this, we have to explicity specify the type `Int`:

```motoko
import D "mo:base/Debug";

var a : Int = 30;

a -= 100;

D.print(debug_show(a));
```
