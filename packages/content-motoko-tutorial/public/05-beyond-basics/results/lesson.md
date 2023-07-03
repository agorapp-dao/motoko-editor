TODO: I should probably explain generics first

In the previous lesson, we have seen that we can represent the error state with an option type:

```motoko
func safeDivide(a : Nat, b: Nat) : ?Nat {
  if (b == 0) {
    null;
  } else {
    ?(a / b)
  }
};
```

Function `safeDivide` returns `null` if you try to divide by zero (this would fail the program otherwise).

The disadvantage of this approach is that you do not communicate to the caller what exactly went wrong.
We can improve this by defining a `Result` type:

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

The `safeDivide` function now returns a [variant type](TODO: link) with two options: `#ok` and `#err`. The `#ok` option
holds the result of the division (if available), and `#err` holds any error that might have occurred.
To use the result, we can use `switch` statement:

```motoko
let c = safeDivide(8, 0);

switch (c) {
  case (#ok(result)) D.print(debug_show(result));
  case (#err(#divideByZero)) D.print("Cannot divide by zero");
};
```

## Exercise

Implement a function `login` that accepts two arguments: `username` and `password`.

If the username is `"admin"` and the password is `"1234"`, the function should return `#ok` with a
`sessionId`. Hard-code the `sessionId` to `"sid:42"`.

If the username or password does not match, it should return error indicating that the wrong password
has been used.

If the password is empty, it should return error indicating that the empty password
has been used.

Call the function and print out the result.
