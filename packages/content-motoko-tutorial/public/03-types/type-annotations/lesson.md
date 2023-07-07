Motoko is a statically-typed language, meaning that every variable is assigned a specific type.
The compiler prohibits you from assigning a value of an incorrect type to a variable. For instance,
you cannot assign a string to a number.

To specify a variable type, you put a type annotation after the variable name, separated by a colon:

```motoko
let n : Nat = 42;
let s : Text = "Hello";
```

In many cases, the compiler can deduce the type of variable based on the context, eliminating the
need for you to explicitly specify it:

```motoko
let n = 42;
let s = "Hello";
```

However, note that for functions, types must always be specified. This includes the type of the
return value:

```motoko
func add(a : Nat, b : Nat) : Nat {
    a + b;
};
```

## Exercise

Add type annotations to the `greet()` function.
