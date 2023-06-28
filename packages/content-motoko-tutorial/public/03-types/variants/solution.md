```motoko
import D "mo:base/Debug";

type Shape = {
  #circle;
  #rectangle;
  #triangle;
};

let s : Shape = #circle;

D.print(debug_show(s));
```
