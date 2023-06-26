There are two fundamental types that represent whole numbers (integers) in Motoko:

- `Nat` represents natural numbers, that is non-negative numbers (0, 1, 2, ...)
- `Int` represents integers (..., -2, -1, 0, 1, 2, ...)

When entering number, you can use `_` character to delimit thousands:

```motoko
let a = 1_000_000;
```

You can use `0x` prefix to enter numbers in hexadecimal notation:

```motoko
let a = 0xff; // 255 : Nat
```

## Bounded integers

`Nat` and `Int` do not have any upper limit on their values. System will allocate as much
memory as needed to store the value. This is not always desirable, especially in the blockchain
application, where memory and blockchain space is scarce.

Because of this, Motoko provides bounded types that have a fixed size:

- `Nat8`, `Nat16`, `Nat32` and `Nat64` for natural numbers
- `Int8`, `Int16`, `Int32`, and `Int64` for integers

Number after the type name represents the number of bits used to store the value.

To use these types, you have to declare them explicitly:

```motoko
let a : Nat8 = 64;
```

Note that `Nat8` and `Nat` are different types, even though they both represent natural numbers. To
convert between them, you have to use `Nat8.toNat()` and `Nat8.fromNat()` functions from the
[standard library](https://internetcomputer.org/docs/current/motoko/main/base/Nat8):

```motoko
import Nat8 "mo:base/Nat8";

let a : Nat8 = 64;
let b : Nat = Nat8.toNat(a);
```

## Exercise

Define following variables:

- `a` of type `Nat8` with value `10`.
- `b` of type `Nat` with a value of `300`.

Then define variable `c`, that will contain sum of `a` and `b`.
