The traditional starting point for learning any language is the "Hello, World!" program. Here's how
you'd print "Hello, World!" to the console in Motoko:

```motoko
import D "mo:base/Debug";

D.print("Hello, World!");
```

To print values to the console we have to import the `Debug` module from the
[Motoko Base Library](https://internetcomputer.org/docs/current/motoko/main/base-intro)
and call `D.print()` function.

To add a value of a variable to the output, we can use the `#` operator to concatenate strings:

```motoko
import D "mo:base/Debug";

let name = "Alice";
D.print("Hello, " # name # "!");
```

When printing non-text values, we have to convert them to text first. Motoko provides us with the
`debug_show` utility function, that makes it easy to print out any value, no matter how complex it is:

```motoko
import D "mo:base/Debug";

let tuple = ("Hello", "World");
D.print(debug_show(tuple));
```

### Exercise

Change the code on the right to print out the contents of the `numbers` variable.
