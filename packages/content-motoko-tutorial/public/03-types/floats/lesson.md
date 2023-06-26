Floats are numbers that have a decimal point:

```motoko
let a = 1.5; // 1.5 : Float
let b = 2.0; // 2 : Float
```

Be careful when working with floats, sometimes their behavior can be surprising:

```motoko
let a = 0.3; // 0.299_999_999_999_999_99 : Float
```

The reason for this is that some numbers cannot be represented exactly in the binary format used
to store these numbers in memory. This is not a problem unique to Motoko. Check out the
[Floating-Point Guide](https://floating-point-gui.de/basic/) to learn more about this topic.

`Float` type is not directly compatible with `Int` or `Nat`. To convert it to these types, use
functions from the [Float](https://internetcomputer.org/docs/current/motoko/main/base/Float) module in the standard library:

```motoko
import Float "mo:base/Float";

let a = 2.6;
let b = Float.toInt(a); // 2 : Int
```

TODO: does Motoko have something like BigDecimal?

## Exercise

Define variable `a` of type `Float` with a value `1.5`. Then define variable `b` of type `Int`,
that will contain the value of `a` rounded up to the nearest integer (in this case `2`).
