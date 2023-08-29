Records are collections of named values:

```motoko
let person = {
  name = "Alice";
  age = 42;
};
```

Values within a record can be accessed using dot notation:

```motoko
person.age; // 42
```

By default, values in a record are immutable, meaning you can't change them. If you want to make a value mutable, it needs to be marked with the `var` keyword:

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

Create a record type `Book`. This record should have the following fields:

- `title` - Name of the book
- `author` - Author of the book
- `publicationYear` - Year the book was published

Write a function called `getBookAge()` that takes a `Book` record as an argument and returns the age of the book (assume the current year is 2023).

Declare a variable `book` and call the `getBookAge` function with it.
