Generic types are not a difficult concept, but they are a bit abstract. We will explain them on
the real-world example where they are often used.

Imagine that you want to create a list structure that can hold any type of data. Implementation for
one type might look something like this:

```motoko
class MyList() {

  let items: [Nat];

  public func add(item : Nat) {
    // ...
  };

  public func remove(item : Nat) {
    // ...
  };

};
```

One way to allow the list to hold any type of data is to use the `Any` type for items:

```motoko
class MyList() {

  let items: [Any];

  public func add(item : Any) {
    // ...
  };

  public func remove(item : Any) {
    // ...
  };

};
```

This works, but now you can actually mix various types in one list, which is often not what you want.
Also, when you retrieve an item from the list, you have to cast it to the correct type, which you
might not know or remember.

Generic types allow you to create a list that can hold any type of data, but you have to specify
which type when you create the list:

```motoko
class MyList<T>() {

  let items: [T];

  public func add(item : T) {
    // ...
  };

  public func remove(item : T) {
    // ...
  };

};
```

The `<T>` after the class name is a placeholder for the type parameter. When you create an instance,
you have to specify which type you want to use for `T`:

```motoko
let listOfTexts = MyList<Text>();
let listOfNumbers = MyList<Nat>();
```

Now, the `listOfText` can only hold `Text` values. If you want to add something else in there, you
will get compile-time error:

```motoko
listOfTexts.add(1); // Error: type mismatch
```

## Exercise

On the right you have a class `Pair` that holds two values of the `Text` type. Make this class
generic, so it can hold pairs of any type.

Then create variable pair2 that holds a pair of two numbers.
