```motoko
import D "mo:base/Debug";

let day = "Monday";

switch (day) {
  case ("Monday") D.print("Start of the work week.");
  case ("Wednesday") D.print("Midweek already!");
  case ("Friday") D.print("Yay! Weekend is coming.");
  case _ D.print("Just another day.")
};
```
