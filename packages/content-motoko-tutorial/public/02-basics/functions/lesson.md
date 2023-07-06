To declare a function in Motoko, use the `func` keyword:

```motoko
func add(a : Nat, b : Nat) : Nat {
  a + b
};
```

The `add` function takes two arguments, `a` and `b`, and returns their sum. Ignore the `: Nat` part
for now, this just tells the compiler that this function accepts and returns natural numbers. We
will talk about types in more detail in the next chapter.

Notice the `;` character we put after the function body. This is required in Motoko. Without it, you
would not be able to add more statements after the function declaration. Consider this example:

```motoko
func add(a : Nat, b : Nat) : Nat {
  a + b
}

let sum = add(1, 2);
```

It looks ok at the first glance, but it does not compile:

```
syntax error [M0001], unexpected token 'let', expected one of token or <phrase> sequence:
  <eof>
  ; seplist(<dec>,<semicolon>)
```

To fix this, we need to add a `;` after the function body:

```motoko
func add(a : Nat, b : Nat) : Nat {
  a + b
};

let sum = add(1, 2);
```

TODO: return

## Exercise

Declare a function `subtract`, that takes two arguments and returns their difference. Call the
function and print out the result.
