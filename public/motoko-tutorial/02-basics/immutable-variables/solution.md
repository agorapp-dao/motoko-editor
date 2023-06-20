```motoko
import D "mo:base/Debug";

var balance = 1000;
balance := balance + 100;

D.print("Current balance: " # debug_show(balance));
```
