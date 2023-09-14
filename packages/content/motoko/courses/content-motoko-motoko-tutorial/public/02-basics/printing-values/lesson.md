The traditional starting point for learning any language is the "Hello, World!" program. Here is an example of how to print "Hello, World!" to the console in Motoko:

```motoko
import D "mo:base/Debug";

D.print("Hello, World!");
```

To print values to the console, we need to import the `Debug` module from the
[Motoko Base Library](https://internetcomputer.org/docs/current/motoko/main/base-intro) and use the `D.print()` function.

To include a variable's value in the output, we can use the `#` operator to concatenate strings:

```motoko
import D "mo:base/Debug";

let name = "Alice";
D.print("Hello, " # name # "!");
```

When we want to print non-text values, they must first be converted to text. Motoko provides the `debug_show` function, that makes it easy to print out any value, no matter how complex it is:

```motoko
import D "mo:base/Debug";

let tuple = ("Hello", "World");
D.print(debug_show(tuple));
```

## Exercise

We have defined the `numbers` variable, that contains an array of numbers. Print the contents of this variable to console.

The program should output the following:

```
numbers: ["zero", "one", ..., "eight", "nine"]
```
