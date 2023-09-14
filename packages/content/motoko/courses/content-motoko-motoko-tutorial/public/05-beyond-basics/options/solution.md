```motoko
import D "mo:base/Debug";

func safeDivide(a : Nat, b: Nat) : ?Nat {
  if (b == 0) {
    null;
  } else {
    ?(a / b)
  }
};

let c = safeDivide(8, 0);

switch (c) {
  case (?result) D.print(debug_show(result));
  case _ D.print("No result");
};
```
