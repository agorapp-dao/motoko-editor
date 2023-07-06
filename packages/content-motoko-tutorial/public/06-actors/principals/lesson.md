Your actor will be deployed as a [canister](https://internetcomputer.org/docs/current/concepts/canisters-code)
on the Internet Computer. This is essentially a public environment, so often you will want to restrict
who can access your actor.

In Motoko, you can get a caller of the method by adding the `shared` keyword to the function definition:

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

Method caller is represented by a principal. Use the [Principal](https://internetcomputer.org/docs/current/motoko/main/base/Principal)
module from the base library to work with principals:

```motoko
Principal.toText(caller); // "iakn2-jkjiq-5dcoa"
```

Principal can represent either an end user or another actor. You can get actor's principal by calling
the `Principal.fromActor()`:

```motoko
Principal.fromActor(TokenWallet); // "nm4y5-zsjiq-5deoa"
```

There is also a special anonymous principal:

```motoko
import Principal "mo:base/Principal";

let anonymous = Principal.fromText("2vxsx-fae");
Principal.isAnonymous(anonymous); // true
```

## Exercise

Finish the implementation of the `whoAmI` method. It should return the principal of the caller. The
principal should be returned as a text.
