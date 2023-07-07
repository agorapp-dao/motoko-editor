Motoko code is in general a mix of declarations and expressions.

A **declaration** introduces a new name into the program:

```motoko
let a = 20;
```

An **expression**, on the other hand, uses the declared name to produce a new value:

```motoko
a * 20;
```

Up to this point, we have been using `D.print()` method to print out the results of our programs.
However, this is not the only way how to do that. A Motoko program returns the result of the
last expression in it:

```motoko
let a = 10;
let b = 20;

// program outputs `30 : Nat`
a + b;
```

## Block expressions

Block expressions are formed by enclosing declarations and expressions within curly brackets:

```motoko
let result = do {
  let a = 10;
  let b = 20;

  a + b;
};
```

Note that `a` and `b` variables are now confined to the block. They cannot be accessed from
the outer scope.

A block expression produces a value, specifically the result of the last expression within it.

In the aforementioned example, we utilized the `do` keyword to create a block expression, storing
its result in the `result` variable.

Block expressions are integral to control flow statements such as `if`, `loop`, and `case`,
which are topics we will explore later in this tutorial.

## Exercise

Create a block expression and declare two variables within it: `firstName` and `lastName`. The
block expression should produce the person's full name. Store the result of the block in the
`fullName` variable and output it without using the `D.print()` function.

To concatenate strings, use the `#` operator.
