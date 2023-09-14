To define a variable use the `var` keyword:

```motoko
var x = 10;
```

In the above example we have defined a variable `x` of type `Nat` (natural number) with an initial value of `10`.

This variable is mutable, which means its value can be changed at any time. To change its value use the `:=` operator:

```motoko
x := 20;
```

## Exercise

Define the variable `balance` with an initial value of 50. Then add 100 to it. Program should output `Current balance: 150`.
