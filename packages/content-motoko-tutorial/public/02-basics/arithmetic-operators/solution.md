```motoko
import D "mo:base/Debug";

let megaByte = 1024 ** 2;

var size = 5 * megaByte;
size += 2 * megaByte;

D.print("Size (in bytes): " # debug_show(size));
D.print("Size (in megabytes): " # debug_show(size / megaByte));
```
