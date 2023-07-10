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

There are two statements you can use to further control the flow of a `for` loop:

- `break` will exit the loop immediately.
- `continue` will skip the rest of the current iteration and move on to the next one.

To use these statements, you must assign a label to the loop first. This is done by adding a
`label <label-name>` statement before the loop:

```motoko
import D "mo:base/Debug";
import Iter "mo:base/Iter";

label numberLoop for (number in Iter.range(1, 10)) {
  if (number == 5) {
    break numberLoop;
  };
  D.print(debug_show(number));
};
```

## Exercise

Print out the sequence of numbers from 10 to 1.
