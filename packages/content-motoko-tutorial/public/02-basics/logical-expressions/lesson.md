Later in this tutorial, we will introduce the if keyword, which enables us to control the program
flow based on certain conditions.

To create these conditions, you use **relational operators**.

- `==` (equal)
- `!=` (not equal)
- `<` (less than)
- `<=` (less than or equal)
- `>` (greater than)
- `>=` (greater than or equal)

These operators compare two values:

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

The `not` operator can be used to negate a condition:

```motoko
let notAllowed = not allowed; // false
```

## If statement

Logical expressions become useful when combined with the `if` statement. This statement allows us to
execute a block of code only if a condition is true:

```motoko
if (age >= 18 and email != "") {
  D.print("Welcome!");
} else {
  D.print("Access denied!");
};
```

We'll explore this further in the control flow section.

## Exercise

Create a variable `isInRange` that will be `true` if `a` is in range `0..100` and `false` otherwise.
Print `a is in range` if `isInRange` evaluates to `true`.

Change the value of `a` to test your condition.

Experiment with `or` and `not` operators to observe their impact on the result.
