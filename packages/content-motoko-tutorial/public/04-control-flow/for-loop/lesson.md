The `for` loop is used to execute a block of code repeatedly. Types in Motoko that can hold
multiple values usually have a method that return an **iterator**, that can be used to iterate
over the values. For example, to iterate over the elements of an array, you will use array's `vals()`
method:

```motoko
import D "mo:base/Debug";

let numbers = ["one", "two", "three"];

for (number in numbers.vals()) {
  D.print(number);
};
```

To iterate over the characters in a string, use `Text.toIter()` method from the
[Text](https://internetcomputer.org/docs/current/motoko/main/base/Text#function-toiter) module:

```motoko
import D "mo:base/Debug";
import Text "mo:base/Text";

let name = "John Doe";

for (char in Text.toIter(name)) {
  D.print(debug_show(char));
};
```

To iterate over the range of numbers, use `Iter.range()` method from the
[Iter](https://internetcomputer.org/docs/current/motoko/main/base/Iter#class-range) module:

```motoko
import D "mo:base/Debug";
import Iter "mo:base/Iter";

for (number in Iter.range(1, 10)) {
  D.print(debug_show(number));
};
```

TODO: `break` and `continue` statements

## Exercise

Print out the sequence of numbers from 10 to 1.
