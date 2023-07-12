```motoko
import D "mo:base/Debug";
import Error "mo:base/Error";

func divide(a : Nat, b: Nat) : async Nat {
  if (b == 0) {
    throw Error.reject("Cannot divide by zero");
  } else {
    a / b
  }
};

func main() : async () {
  try {
    let res = await divide(8, 0);
    D.print("Result: " # debug_show(res));
  } catch (err) {
    D.print("Failed");
  };
};

await main();
```
