Records are collections of named values:

```motoko
let person = {
  name = "Alice";
  age = 42;
};
```

You can access the values in a record using dot notation:

```motoko
person.age; // 42
```

Values in a record are immutable by default, you can't change them. To make a value mutable,
you have to mark it with the `var` keyword:

```motoko
let person = {
  name = "Alice";
  var age = 42;
};

person.age += 1;
```

You can create a type for the record using the `type` keyword:

```motoko
type Person = {
  name : Text;
  age : Nat;
};

let person: Person = { name = "Alice"; age = 42; };
```

## Exercise

Create a record type for a `Book`. This record should have fields for `title` (string), `author` (string),
and `publicationYear` (integer).

Write a function `getBookAge` that takes a `Book` record as an argument and returns the age of
the book (assume current year is 2023).

Declare a variable `book` and call the `getBookAge` function with it.
