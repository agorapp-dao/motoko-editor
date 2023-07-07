The `for` loop is used to execute a block of code repeatedly. In Motoko, types that can hold
multiple values typically have a method that returns an **iterator**. This can be used to iterate
over the values. For instance, to iterate over the elements of an array, you would use the array's
`vals()` method:

```motoko
import D "mo:base/Debug";

let numbers = ["one", "two", "three"];

for (number in numbers.vals()) {
  D.print(number);
};
```

To iterate over the characters in a string, use the `Text.toIter()` method from the
[Text](https://internetcomputer.org/docs/current/motoko/main/base/Text#function-toiter) module:

```motoko
import D "mo:base/Debug";
import Text "mo:base/Text";

let name = "John Doe";

for (char in Text.toIter(name)) {
  D.print(debug_show(char));
};
```

To iterate over a range of numbers, use the `Iter.range()` method from the
[Iter](https://internetcomputer.org/docs/current/motoko/main/base/Iter#class-range) module:

```motoko
import D "mo:base/Debug";
import Iter "mo:base/Iter";

for (number in Iter.range(1, 10)) {
  D.print(debug_show(number));
};
```

TODO: Does Motoko for have `break` and `continue` statements?

## Exercise

Print out the sequence of numbers from 10 to 1.
