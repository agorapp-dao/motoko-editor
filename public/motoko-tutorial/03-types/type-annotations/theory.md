Motoko is a statically-typed language. This means that every variable has a type, and the compiler
won't let you assign a value of a wrong type to it. For example, you can't assign string to number.

To specify a variable type, you put type annotation behind the variable name, separated by a colon:

```motoko
let n : Nat = 42;
let s : Text = "Hello";
```

In many cases, the compiler can infer the type of a variable from the context, so you don't need to
specify it:

```motoko
let n = 42;
let s = "Hello";
```

Note that for functions, types have to always be specified, including the type of the return value:

```motoko
func add(a : Nat, b : Nat) : Nat {
    a + b;
};
```
