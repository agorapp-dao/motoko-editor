```motoko
import D "mo:base/Debug";

type Result = {
  #ok : Nat;
  #err : Text;
};

func processResult(res : Result) {
  switch (res) {
    case (#ok(number)) D.print("Operation successful, received: " # debug_show(number));
    case (#err(msg)) D.print("Operation failed with error: " # msg);
  }
};

processResult(#ok(42));
processResult(#err("Permission denied"));
```
