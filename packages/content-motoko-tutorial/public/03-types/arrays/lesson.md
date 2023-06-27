Array holds a list of values. To declare an array, use square brackets `[]`:

```motoko
let days = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ];
```

To access the value at a given index, use the `[]` operator:

```motoko
let tue = days[1]; // "Tue"
```

Array has a size, which is the number of elements it holds. You can access the size using the `size`
function. If you try to access an element that is out of bounds, the program will crash:

```motoko
days[8]; // Error: index out of bounds

// use size() function to get the size of array
days.size(); // 7
```

Array is by default immutable - you cannot change the value of an element in the array. To create a
mutable version of array, use the `var` keyword when declaring the array:

```motoko
let counters = [var 0, 0, 0];

counters[1] += 1;
counters[2] += 1;
counters[2] += 1;

counters; // [0, 1, 2]
```

Even mutable array is immutable in the sense that you cannot change the size of the array. To add
or remove elements from the array, you have to create a new array. To do that, you can use functions
from the [Array](https://internetcomputer.org/docs/current/motoko/main/base/Array) module:

```motoko
import Array "mo:base/Array";

let originalArray = [1, 2, 3];
// TODO: deprecated, `Array.append` copies its arguments and has linear complexity;
let newArray = Array.append(originalArray, [4]);

originalArray; // [1, 2, 3]
newArray; // [1, 2, 3, 4]
```

## Exercise

Declare array named `fruits` and populate it with 3 elements: `"apple"`, `"banana"`, `"cherry"`.

Add fourth element to the array.

Change the value of the second element to `"pear"`.

Print the size of the array;
