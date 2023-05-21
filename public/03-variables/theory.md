To define a variable you can use the `var` keyword:

```motoko
var x: Nat = 10;
```

Here we have defined a variable `x` of type `Nat` (natural number) with an
initial value of `10`.

The variable in the previous example is mutable, which means its value can be changed
at any time. To change its value you can use `:=` operator:

```motoko
x := 20;
```

Often it's useful to create immutable variables, whose value is
read-only. To achieve that you can use `let` keyword:

```motoko
let x: Nat = 10;
```

In many cases you can omit the type annotation, the compiler is able to infer the
correct type from the surrounding code:

```motoko
let x: Nat = 10;
let y = x;
```
