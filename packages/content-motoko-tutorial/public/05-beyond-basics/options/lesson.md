You can prefix any type in Motoko with `?` to indicate that it doesn't have to hold value:

```motoko
let a : ?Nat = null;
```

`?Nat` is called an **option type** and you can assign `null` to it, which represents no value.

If you want to assign value to an option type, you have to prefix the value with `?` as well:

```motoko
let a : ?Nat = ?42;
```

To get a value from the option type safely, you can use the `switch` statement:

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

Another way how to work with option types is to use an **option block**. You start the block with
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

Call the function and print out the result. If result is `null`, print out `No result`.
