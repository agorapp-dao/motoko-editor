If expressions are used to branch execution based on a condition:

```motoko
if (condition1) {
  // code to execute if condition1 is true
} else if (condition2) {
  // code to execute if condition2 is true
} else {
  // code to execute if both conditions are false
};
```

The `else` clause is optional. Also, the if expression should be concluded with a semicolon.

The `if` condition must evaluate to a boolean value:

```motoko
if (name == "John" and age > 18) {
  D.print("Welcome back, John");
};
```

Refer to the [Logical expressions](../logical-expressions) lesson for additional details about the
available operators.

Unlike in other languages, the `if` expression in Motoko is an expression, not a statement. This
means that it evaluates to a value:

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

We have defined a variable `number` on the right. Write a program that will examine whether the
number is positive, negative, or zero.

The program should output one of the following messages:

- `The number is positive`
- `The number is negative`
- `The number is zero`
