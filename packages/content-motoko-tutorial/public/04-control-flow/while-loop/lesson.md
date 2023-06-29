The `while` loop is used to execute a block of code repeatedly while a given condition is true:

```motoko
import D "mo:base/Debug";

var counter = 0;
while (counter < 5) {
  D.print(debug_show(counter));
  counter += 1;
}
```

In the previous example, we are evaluating the `while` condition at the beginning of the loop block.
We can also evaluate the condition at the end of the loop:

```motoko
import D "mo:base/Debug";

var counter = 0;
do {
  D.print(debug_show(counter));
  counter += 1;
} while (counter < 5);
```

While this gives us the same result, there is one important difference. The body of the loop will
always be executed at least once, even if the `while` condition is false.

You can terminate the loop early by using the `break` statement:

```motoko
import D "mo:base/Debug";

var counter = 0;
while (true) {
  D.print(debug_show(counter));
  counter += 1;

  if (counter >= 5) break;
}
```

TODO: `break` and `continue` statements

## Exercise

Print out the sequence of numbers from 10 to 1 using the `while` loop.
