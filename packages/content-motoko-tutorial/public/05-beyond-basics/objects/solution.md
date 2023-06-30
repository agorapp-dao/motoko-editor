```motoko
// your code here
let person = object {
  public let firstName = "John";
  public let lastName = "Doe";

  public func getFullName() : Text {
    firstName # " " # lastName;
  };
};

person.getFullName();
```
