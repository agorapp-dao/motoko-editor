In the previous lesson, we learned how to represent error states using an option type:

```motoko
func safeDivide(a : Nat, b: Nat) : ?Nat {
  if (b == 0) {
    null;
  } else {
    ?(a / b)
  }
};
```

The `safeDivide` function returns `null` if there's an attempt to divide by zero, which would otherwise cause the program to crash.

A limitation of this approach is that it doesn't inform the caller specifically about what went wrong. We can improve this by defining a `Result` type:

```motoko
type Result<Ok, Err> = { #ok : Ok; #err : Err };
type DivideError = { #divideByZero };

func safeDivide(a : Nat, b: Nat) : Result<Nat, DivideError> {
  if (b == 0) {
    #err(#divideByZero);
  } else {
    #ok(a / b);
  }
};
```

The `safeDivide` function now returns a [variant type](../variants) with two options: `#ok` and `#err`. The `#ok` option holds the result of the division (if available), while `#err` holds any error that might have occurred.

To process the result, we can use the `switch` statement:

```motoko
let c = safeDivide(8, 0);

switch (c) {
  case (#ok(result)) D.print(debug_show(result));
  case (#err(#divideByZero)) D.print("Cannot divide by zero");
};
```

The base library contains the [Result](https://internetcomputer.org/docs/current/motoko/main/base/Result) module. It provides a collection of utility functions for working with result types:

```motoko
import Result "mo:base/Result";

// note that we're using the Result type from the base library
func safeDivide(a : Nat, b: Nat) : Result.Result<Nat, DivideError> {
  if (b == 0) {
    #err(#divideByZero);
  } else {
    #ok(a / b);
  }
};

let c = safeDivide(8, 0);

// convert result to optional value
Result.toOption(c);

if (Result.isOk(c)) {
  // ...
}
```

## Exercise

Write a `login` function that accepts two arguments: `username` and `password`.

If the username is `"admin"` and the password is `"1234"`, the function should return `#ok` with a value of session id. Hard-code the session id to `"sid:42"`.

If the username or password does not match, the function should return an error indicating that the wrong password has been used.

If the password is empty, the function should return and error stating that en empty password has been used.

Finally, call the function and print out the result.
