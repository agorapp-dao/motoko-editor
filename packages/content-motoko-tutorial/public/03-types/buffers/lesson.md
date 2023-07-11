Arrays in Motoko have a fixed size. If you need a list of values that can grow or shrink, you should
use the `Buffer` type instead.

A buffer is essentially a mutable list of values of a specific type. To declare a buffer, use the
[Buffer](https://internetcomputer.org/docs/current/motoko/main/base/Buffer) constructor from the base
library:

```motoko
import Buffer "mo:base/Buffer";

let names = Buffer.Buffer<Text>(3);
```

`Buffer<Text>` tells the compiler that the buffer will hold values of type `Text`. This notation is
explained in more detail in the lesson on [Generic types](../generic-types).

There are two buffer properties that are sometimes confused with each other - `size` and
`capacity`:

- `size` refers to the actual number of elements in the buffer. Initially, the buffer is empty, so its size is 0.
- `capacity` refers to the size of the underlying buffer. In the example above, the buffer has an
  initial capacity of 3. When there is no free space left in the buffer, it will be automatically
  resized to accommodate more elements.

You can use `size()` and `capacity()` functions to access these properties:

```motoko
names.size(); // 0
names.capacity(); // 3
```

To add an element to the buffer, use the `add` method:

```motoko
names.add("Alice");
names.add("Bob");
```

To access an element at a specific index, use the `get` method:

```motoko
names.get(1); // "Bob"
```

To remove an element at a specific index, use the `remove` method:

```motoko
names.remove(0); // "Alice"
```

You can convert a buffer to an array using the `toArray` method:

```motoko
Buffer.toArray(names); // ["Alice", "Bob"] : [Text]
```

## Exercise

Create a buffer named `cities` with an initial capacity of 3.

Add four elements to the buffer: `"London"`, `"Paris"`, `"Tokyo"`, `"New York"`.

Print out the size and capacity of the buffer.

Print out the contents of the buffer.
