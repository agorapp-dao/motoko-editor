Class is like a template for an object. It describes which fields and methods an object will have and
how to create it:

```motoko
class Person(_firstName : Text, _lastName : Text) {
  public let firstName = _firstName;
  public let lastName = _lastName;

  public func getFullName() : Text {
    firstName # " " # lastName;
  };
};
```

Once you have a class, you can create object instances from it:

```motoko
let person1 = Person("John", "Doe");
let person2 = Person("Jane", "Doe");
```

You can also use a class as a type annotation:

```motoko
func greet(p : Person) : Text {
  "Hello, " # p.getFullName();
};
```

## Exercise

Create a class `Counter` with a private field `counter` and two public methods `increment()` and
`get()`. The `increment()` method should increment the counter and the `get()` method should return
the current value of the counter.

Create an instance of the `Counter` class and call the `increment()` method on it twice. Then call
the `get()` method.
