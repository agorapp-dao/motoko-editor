An array holds a list of values. To declare an array, use square brackets `[]`:

```motoko
let days = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ];
```

To access the value at a specific index, use the `[]` operator:

```motoko
let tue = days[1]; // "Tue"
```

An array has a size, which refers to the number of elements it holds. You can access the size using the `size()` function. If you try to access an element that is out of bounds, the program will crash:

```motoko
days[8]; // Error: index out of bounds

// use size() function to get the size of array
days.size(); // 7
```

By default, an array is immutable - you cannot change the value of an element in the array. To create a mutable version of the array, use the `var` keyword when declaring it:

```motoko
let counters = [var 0, 0, 0];

counters[1] += 1;
counters[2] += 1;
counters[2] += 1;

counters; // [0, 1, 2]
```

Even a mutable array is immutable in the sense that you cannot change its size. If you require a list of values with the ability to grow or shrink, you should use the `Buffer` type instead, which we will cover in the next lesson.

## Exercise

Declare an array named `fruits` and populate it with three elements: `"apple"`, `"banana"`, `"cherry"`.

Change the value of the second element to `"pear"`.

Print the content and size of the array.
