A tuple is an ordered sequence of values enclosed in parentheses:

```motoko
let tuple = (42, true);
```

There are several ways to access the values in a tuple:

```motoko
// dot notation
let first = tuple.0; // 42
let second = tuple.1; // true

// destructuring
let (first, second) = tuple;
let (_, second) = tuple; // ignore the first value
```

Tuple is immutable, you can't change the values in it:

```motoko
tuple.0 := 43; // fails
```

Tuples are useful for grouping two or more related pieces of information. For example, you can use
a tuple to represent a point in 2D space:

```motoko
let point = (20, 15);
```

You can also use a tuple to return multiple values from a function:

```motoko
// this function returns the result and remainder of x / y
func divide(x : Nat, y : Nat) : (Nat, Nat) {
  (x / y, x % y)
};

divide(11, 5); // (2, 1)
```

## Exercise

Write a function `swap` that takes a tuple of two values and returns a tuple with the values swapped.
