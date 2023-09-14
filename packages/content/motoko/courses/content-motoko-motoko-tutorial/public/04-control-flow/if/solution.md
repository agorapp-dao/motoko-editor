```motoko
import D "mo:base/Debug";

let number = 10;

if (number > 0) {
  D.print("The number is positive");
} else if (number < 0) {
  D.print("The number is negative");
} else {
  D.print("The number is zero");
};
```
