In this section, we will look into the `Text` type, which represents Unicode strings. To declare a text variable, simply put the string in double quotes:

```motoko
let text = "Hello, world!";
```

Texts can be concatenated using the `#` operator:

```motoko
let firstName = "John";
let lastName = "Doe";
let fullName = firstName # " " # lastName;
```

To determine the length of a text, use the `size()` function:

```motoko
let text = "Hello, world!";
text.size(); // 13
```

The base library includes the [Text](https://internetcomputer.org/docs/current/motoko/main/base/Text) module, which contains useful utility functions. Here are some examples:

```motoko
import Text "mo:base/Text";
import D "mo:base/Debug";

// Does string contain "World"?
Text.contains("Hello, World!", #text "World"); // true

// Split string by character
let words = Text.split("This is a sentence.", #char ' ');

```

Note that when concatenating strings, you can't mix `Text` and other types (such as `Nat`). You must first convert these other types to `Text`:

```motoko
import Nat "mo:base/Nat";

let counter = 0;
let text = "Counter: " # Nat.toText(counter);
```

## Characters

You can use the `chars()` function to iterate over the characters in the string:

```motoko
for (c in "abc".chars()) {
  D.print(debug_show(c));
};
```

Note that when working with characters, you are actually working with a different type, called `Char`. This type represents a single Unicode character. To create a character, use single quotes:

```motoko
let c = 'a';
```

## Exercise

We have defined the `text` variable for you. Your task is to find out how many `o` characters are there in the string and print the result using the `D.print()` function.

For text `"Hello, World!"`, the output should look like this:

```
There are 2 'o' characters in the string.
```

To solve this exercise, you will need to use the `if` expression we will introduce later. For now simple condition like this will suffice:

```motoko
if (text == "Hello, World!") {
  // do something
};
```
