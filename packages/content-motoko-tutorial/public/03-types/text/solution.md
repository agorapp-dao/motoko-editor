```motoko
import D "mo:base/Debug";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

let text = "Hello, World!";
var counter = 0;

for (c in Text.toIter(text)) {
    if (c == 'l') {
        counter += 1;
    }
};

D.print("There are " # Nat.toText(counter) # " 'l' characters in the string.");
```
