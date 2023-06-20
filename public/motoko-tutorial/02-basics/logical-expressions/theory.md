Later in the tutorial we will introduce the `if` keyword, which allows us to control the program
flow based on some conditions.

To form these conditions, you can use **relational operators**.

- `==` (equal)
- `!=` (not equal)
- `<` (less than)
- `<=` (less than or equal)
- `>` (greater than)
- `>=` (greater than or equal)

These operators are used to compare two values:

```motoko
let a = 10;
let b = 20;
let condition = a < b; // true
```

To combine multiple conditions, you can use **logical operators**:

- `and` (logical AND)
- `or` (logical OR)
- `not` (logical NOT)

Use `and` and `or` to combine two conditions:

```motoko
let age = 35;
let email = "johndoe@example.com";

let allowed = age >= 18 and email != ""; // true
```

`not` operator can be used to negate a condition:

```motoko
let notAllowed = not allowed; // false
```

## Exercise

Create a variable `isInRange` that is `true` if `a` is in range `0..100` and `false` otherwise.

Change the value of `a` to test your condition.

Experiment with `or` and `not` operators to see what
effect they have on the result.
