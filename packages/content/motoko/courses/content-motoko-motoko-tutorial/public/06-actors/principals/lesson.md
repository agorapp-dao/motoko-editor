Your actor will be deployed in a [canister](https://internetcomputer.org/docs/current/concepts/canisters-code) on the Internet Computer. This is essentially a public environment, so it's often crucial to regulate who has access to your actor.

In Motoko, you can identify the caller of a method by capturing the message params with the `shared` keyword:

```motoko
import D "mo:base/Debug";
import Principal "mo:base/Principal";
import Error "mo:base/Error";

actor TokenWallet {

  public shared(message) func deposit(amount : Nat) : async () {
    let { caller } = message;
    D.print("Caller is: " # debug_show caller);
  };

};
```

A Method caller is represented by a principal. Use the [Principal](https://internetcomputer.org/docs/current/motoko/main/base/Principal)
module from the base library to work with principals:

```motoko
Principal.toText(caller); // "iakn2-jkjiq-5dcoa"
```

A principal can represent either an end user or another actor. You can get an actor's principal by calling the `Principal.fromActor()`:

```motoko
Principal.fromActor(TokenWallet); // "nm4y5-zsjiq-5deoa"
```

Additionally, there is a special anonymous principal:

```motoko
import Principal "mo:base/Principal";

let anonymous = Principal.fromText("2vxsx-fae");
Principal.isAnonymous(anonymous); // true
```

## Exercise

Complete the implementation of the `whoAmI` method. It should return the caller's principal, represented as text.
