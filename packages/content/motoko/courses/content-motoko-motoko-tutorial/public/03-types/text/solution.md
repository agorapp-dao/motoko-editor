```motoko
import D "mo:base/Debug";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

let text = "Hello, World!";
var counter = 0;

for (c in Text.toIter(text)) {
  if (c == 'o') {
    counter += 1;
  }
};

D.print("There are " # Nat.toText(counter) # " 'o' characters in the string.");
```
