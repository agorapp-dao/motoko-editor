Floats are numbers that have a decimal point:

```motoko
let a = 1.5; // 1.5 : Float
let b = 2.0; // 2 : Float
```

Be cautious when working with floats, as their behavior can sometimes be surprising:

```motoko
let a = 0.3; // 0.299_999_999_999_999_99 : Float
```

The discrepancy above arises because some numbers cannot be precisely represented in the binary format used to store these numbers in memory. This issue is not unique to Motoko. Refer to the [Floating-Point Guide](https://floating-point-gui.de/basic/) to learn more about this topic.

The `Float` type is not directly compatible with `Int` or `Nat`. To convert it to these types, use functions from the [Float](https://internetcomputer.org/docs/current/motoko/main/base/Float) module in the base library:

```motoko
import Float "mo:base/Float";

let a = 2.6;
let b = Float.toInt(a); // 2 : Int
```

## Exercise

Define the following variables:

- `a` of type `Float` with a value of `1.5`.
- `b` of type `Int`, that will contain the value of `a` rounded up to the nearest integer (in this case `2`).
