If expressions are used to branch execution based on a condition:

```motoko
if (condition1) {
  // code to execute if condition1 is true
} else if (condition2) {
  // code to execute if condition2 is true
} else {
  // code to execute if condition is false
};
```

The `else` clause is optional. Note that the if expression should be terminated with a semicolon.

The condition must evaluate to a boolean value:

```motoko
if (name == "John" and age > 18) {
  D.print("Welcome back, John");
};
```

See the [Logical expressions](/editor/motoko-tutorial/logical-expressions) lesson for more detail
about available operators.

Unlike in other languages, the `if` expression is an expression, not a statement. This means that it
evaluates to a value:

```motoko
let greeting = if (name == "John") {
  "Hello John";
} else {
  "Hello stranger";
};

D.print(greeting);
```

You can omit the curly brackets to make the code above more concise:

```motoko
let greeting = if (name == "John") "Hello John" else "Hello stranger";
```

## Exercise

We have declared a variable `number`. Write a program that will check if a number is positive, negative,
or zero.

The program should output one of the following messages:

- `The number is positive`
- `The number is negative`
- `The number is zero`
