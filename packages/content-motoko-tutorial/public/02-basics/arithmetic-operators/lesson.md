Motoko supports the following arithmetic operators:

- `+` (addition)
- `-` (subtraction)
- `*` (multiplication)
- `/` (division)
- `%` (modulo)
- `**` (exponentiation)

When combining multiple operators in one expression, the order of operations follows the standard
mathematical conventions. For instance, multiplication and division take precedence over
addition and subtraction:

```motoko
var x = 10 * 2 + 5; // x = 25
```

You can change the order of operations by using parentheses:

```motoko
var x = 10 * (2 + 5); // x = 70
```

Each arithmetic operator also has a shorthand version that combines assignment and operation,
eliminating the need to repeat the variable name:

```motoko
var x = 10;
x *= 2; // x = 20
x += 5; // x = 25
```

## Exercise

We have declared a `megaByte` variable for you, which represents the number of bytes in one
megabyte (this is computed by multiplying 1024 by 1024, resulting in approximately one million bytes).

Define a variable size that represents the number of bytes in 5 megabytes. Then, add another 2
megabytes to it. Print the resulting size in both bytes and megabytes.

The expected output is:

```
Size (in bytes): 7_340_032
Size (in megabytes): 7
```
