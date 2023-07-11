To declare a function in Motoko, use the `func` keyword:

```motoko
func add(a : Int, b : Int) : Nat {
  a + b;
};
```

The `add` function takes two parameters, `a` and `b`, and returns their sum. Ignore the `: Int` part
for now, this just tells the compiler that this function accepts and returns integers. We
will talk about types in more detail in the next chapter.

A function returns the result of the last expression in its body. However, there may be scenarios
where you wish to exit the function earlier. In such case, use the `return` keyword:

```motoko
func add(a : Int, b : Int) : Int {
  if (a == 0) {
    return b;
  };
  a + b;
};
```

Don't forget to add a semicolon after the function body. This is required in Motoko. Without it, you
would not be able to add more statements after the function declaration. Consider this example:

```motoko
func add(a : Int, b : Int) : Int {
  a + b;
}

let sum = add(1, 2);
```

While this might seem correct at first glance, it does not compile and produces the following error:

```
syntax error [M0001], unexpected token 'let', expected one of token or <phrase> sequence:
  <eof>
  ; seplist(<dec>,<semicolon>)
```

To fix this, we need to append a `;` after the function body:

```motoko
func add(a : Int, b : Int) : Int {
  a + b
};

let sum = add(1, 2);
```

## Exercise

Declare a function `subtract`, that takes two arguments and returns their difference. Call the
function and print out the result.
