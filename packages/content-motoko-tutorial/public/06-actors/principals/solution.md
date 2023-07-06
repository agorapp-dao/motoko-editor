```motoko
import D "mo:base/Debug";
import Principal "mo:base/Principal";

actor MyInfo {

  public shared(message) func whoAmI() : async Text {
    let { caller } = message;
    // return the caller's principal
    Principal.toText(caller);
  };

};

await MyInfo.whoAmI();
```
