There are two fundamental types that represent whole numbers (integers) in Motoko:

- `Nat` represents natural numbers, that is non-negative numbers (0, 1, 2, ...)
- `Int` represents integers (..., -2, -1, 0, 1, 2, ...)

When entering a number, you can use `_` character to delimit thousands:

```motoko
let a = 1_000_000;
```

You can use `0x` prefix to enter numbers in hexadecimal notation:

```motoko
let a = 0xff; // 255 : Nat
```

## Bounded integers

`Nat` and `Int` do not have an upper limit on their values. The System will allocate as much
memory as needed to store the value. However, this may not always be desirable, especially in
blockchain applications, where memory and blockchain space are limited.

For this reason, Motoko provides bounded types that have a fixed size:

- `Nat8`, `Nat16`, `Nat32` and `Nat64` for natural numbers
- `Int8`, `Int16`, `Int32`, and `Int64` for integers

The number following the type name represents the number of bits used to store the value.

To use these types, you must explicitly declare them:

```motoko
let a : Nat8 = 64;
```

Note that `Nat8` and `Nat` are different types, despite both representing natural numbers. To
convert between them, you need to use the `Nat8.toNat()` and `Nat8.fromNat()` functions from the
[base library](https://internetcomputer.org/docs/current/motoko/main/base/Nat8):

```motoko
import Nat8 "mo:base/Nat8";

let a : Nat8 = 64;
let b : Nat = Nat8.toNat(a);
```

## Exercise

Define the following variables:

- `a` of type `Nat8` with a value of `10`.
- `b` of type `Nat` with a value of `300`.

Then, define a variable `c` that will contain the sum of `a` and `b`.
