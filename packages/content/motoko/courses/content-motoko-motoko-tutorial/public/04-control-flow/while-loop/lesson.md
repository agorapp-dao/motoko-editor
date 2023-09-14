The `while` loop is used to execute a block of code repeatedly as long as a given condition is true:

```motoko
import D "mo:base/Debug";

var counter = 0;
while (counter < 5) {
  D.print(debug_show(counter));
  counter += 1;
}
```

In the previous example, we evaluate the while condition at the beginning of the loop block. We can also evaluate the condition at the end of the loop using a `loop-while`:

```motoko
import D "mo:base/Debug";

var counter = 0;
loop {
  D.print(debug_show(counter));
  counter += 1;
} while (counter < 5);
```

While this gives us the same result, there is one important difference. The body of the `loop-while` loop will always be executed at least once, even if the `while` condition is false.

Just like with the `for` loop, you can use `break` and `continue` statements in conjunction with a `label` to control the flow of the loop:

```motoko
import D "mo:base/Debug";

var counter = 0;
label counterLoop while (counter < 5) {
  D.print(debug_show(counter));
  counter += 1;
  if (counter == 3) {
    break counterLoop;
  };
}
```

## Exercise

Print out the sequence of numbers from 10 to 1 using the `while` loop.
