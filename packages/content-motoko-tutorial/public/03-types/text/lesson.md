In this section, we will look into the `Text` type. This type represents Unicode string. To declare
the text, simply put the string in double quotes:

```motoko
let text = "Hello, world!";
```

Texts can be concatenated using the `#` operator:

```motoko
let firstName = "John";
let lastName = "Doe";
let fullName = firstName # " " # lastName;
```

To get the length of the string, use the `size()` function:

```motoko
let text = "Hello, world!";
text.size(); // 13
```

Standard library includes the [Text](https://internetcomputer.org/docs/current/motoko/main/base/Text)
module, that contains useful utility functions. Here are some examples:

```motoko
import Text "mo:base/Text";
import D "mo:base/Debug";

// Does string contain "World"?
Text.contains("Hello, World!", #text "World"); // true

// Split string by character
let words = Text.split("This is a sentence.", #char ' ');

```

Note that when concatenating strings, you can't mix `Text` and other types (such as `Nat`). You have
to convert these other types to `Text` first:

```motoko
import Nat "mo:base/Nat";

let counter = 0;
let text = "Counter: " # Nat.toText(counter);
```

## Characters

To access the characters in the string, you have several options:

```motoko
// Iterate over characters in the string
for (c in Text.toIter("abc")) {
  D.print(debug_show(c));
};
```

TODO: can I access characters by index?

Note that when working with characters, you are actually working with a different type, called
`Char`. This type represents a single Unicode character. To create a character, use single quotes:

```motoko
let c = 'a';
```

## Exercise

We have defined the `text` variable for you. Your task is to find out how many `l` characters are
there in the string and print the result using the `D.print()` function. For text `"Hello, World!"`,
the output should look like this:

```
There are 3 'l' characters in the string.
```
