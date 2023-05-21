The traditional starting point for learning any language is the "Hello, World!" program. Here's how
you'd print "Hello, World!" to the console in Motoko:

```motoko
import D "mo:base/Debug";

D.print("Hello, World!");
```

To print values we have to first import the `Debug` module from the [Motoko Base Library](https://internetcomputer.org/docs/current/motoko/main/base-intro).
After that we call `D.print()` function with a text we want to print to the console.

We can also print the values of variables:

```motoko
import D "mo:base/Debug";

let name = "Alice";
D.print("Hello, " # name # "!");
```

For debugging, it's also useful to be able to print out more complex structures. In the following
example we have a tuple (a pair of values), and we print them with a `debug_show` function:

```motoko
import D "mo:base/Debug";

let tuple = ("Hello", "World");
D.print(debug_show(tuple));
```

Change the code on the right to print out the contents of the `numbers` variable.
