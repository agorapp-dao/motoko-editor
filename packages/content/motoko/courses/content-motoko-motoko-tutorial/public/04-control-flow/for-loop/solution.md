```motoko
import D "mo:base/Debug";
import Iter "mo:base/Iter";

for (number in Iter.revRange(10, 1)) {
  D.print(debug_show(number));
};
```
