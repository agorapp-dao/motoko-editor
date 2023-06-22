```motoko
import D "mo:base/Debug";

var balance = 0;
balance := balance + 100;

D.print("Current balance: " # debug_show(balance));
```
