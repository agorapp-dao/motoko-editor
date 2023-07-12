In Motoko, you can use the `?` prefix with any type to indicate that it may not hold a value:

```motoko
let a : ?Nat = null;
```

`?Nat` is called an **option type**, which can be assigned a `null` value, that represents the absence
of a value.

If you want to assign actual value to an option type, you have to prefix it with `?`:

```motoko
let a : ?Nat = ?42;
```

To safely extract a value from an option type, you can use the `switch` statement:

```motoko
let a : ?Nat = ?42;

switch (a) {
  case (?x) {
    "Number: " # debug_show(x);
  };
  case (null) {
    "Empty value";
  };
};
```

Extracting values from option types like this can be cumbersome, so Motoko provides some utility
methods in the [Option](https://internetcomputer.org/docs/current/motoko/main/base/Option) module:

```motoko
import Option "mo:base/Option";

let a : ?Nat = null;

// Get value or default if null
Option.get(a, 0); // 0 : Nat
```

Another approach to dealing with option types is to use an **option block**. You start the block with
`do ?` and then you can use `!` to get the value from the option type:

```motoko
func add(x : ?Nat, y: ?Nat) : ?Nat {
  do ? { x! + y! };
};

add(?1, ?2); // ?3
add(null, ?2); // null
```

## Exercise

Implement a function `safeDivide` that takes two `Nat` arguments and returns the result as an option
type. If the second argument is `0`, the function should return `null`.

Call the function and print out the result. If the result is `null`, print out `No result`.
