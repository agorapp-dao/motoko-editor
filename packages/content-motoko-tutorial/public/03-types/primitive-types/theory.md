Motoko support variety of built-in types, including:

- `Bool`: `true` or `false`
- `Char`: Unicode characters
- `Text`: Unicode strings
- `Int`: integers (with positive and negative values)
- `Nat`: natural numbers (non-negative integers)
- `Blob`: binary blobs

Special type you will encounter from time to time is unit type `()`. This type represents the
absence of a value (in other languages often called `void`). It can be used to indicate that a
function does not return any value:

```motoko
func printNumber(a : Nat) {
  D.print(debug_show(a));
};

printNumber(10);
```

See Motoko documentation for the [full list of supported types](https://internetcomputer.org/docs/current/motoko/main/language-manual#primitive-types).

We will be talking about some of these types in more detail in the following sections.

## Exercise

Code on the right does not compile. Can you fix it?
