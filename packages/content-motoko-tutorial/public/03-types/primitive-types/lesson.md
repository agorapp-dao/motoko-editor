Motoko supports a variety of built-in types, including:

- `Bool` - `true` or `false`
- `Char` - Unicode characters
- `Text` - Unicode strings
- `Int` - integers (includes both positive and negative values)
- `Nat` - natural numbers (only positive values or zero)
- `Blob` - binary blobs

A unique type you will occasionally encounter is the unit type (). This type symbolizes the absence
of a value (similar to void in other languages). It can be utilized to indicate that a function
does not return any value:

```motoko
func printNumber(a : Nat) : () {
  D.print(debug_show(a));
};

printNumber(10);
```

Refer to the Motoko documentation for the [full list of supported types](https://internetcomputer.org/docs/current/motoko/main/language-manual#primitive-types).

We will be talking about some of these types in more detail in the following sections.

## Exercise

The code on the right does not compile. Can you fix it?
