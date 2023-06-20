Motoko supports following arithmetic operators:

- `+` - addition
- `-` - subtraction
- `*` - multiplication
- `/` - division
- `%` - modulo
- `**` - exponentiation

When combining multiple operators in one expression, the order of operations is the same as in
mathematics. For example, multiplication and division have higher precedence than addition and
subtraction:

```motoko
var x = 10 * 2 + 5; // x = 25
```

You can change the order of operations by using parentheses:

```motoko
var x = 10 * (2 + 5); // x = 70
```

Each arithmetic operator has a shorthand version that allows you to combine assignment and operation
without having to repeat the variable name:

```motoko
var x = 10;
x *= 2; // x = 20
x += 5; // x = 25
```

## Exercise

We have declared `megaByte` variable for you. It contains the number of bytes in one megabyte (you
can compute this by multiplying 1024 by 1024, which gives you roughly 1 million bytes).

Define variable `size` that contains the number of bytes in 5 megabytes. Add another 2 megabytes to
it. Print the resulting size in both bytes and megabytes.

You should get the following output:

```
Size (in bytes): 7_340_032
Size (in megabytes): 7
```
