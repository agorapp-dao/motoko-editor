```motoko
import D "mo:base/Debug";

var counter = 10;

while (counter > 0) {
  D.print(debug_show(counter));
  counter -= 1;
}
```
