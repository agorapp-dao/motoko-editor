A variant type represents a set of options that can be assigned to a variable:

```motoko
type Day = {#Sun; #Mon; #Tue; #Wed; #Thu; #Fri; #Sat};

let day : Day = #Wed;
```

You can assign a type to each option. This is useful when you want to store additional information in
the variant:

```motoko
type Result = {
  #ok : Nat;
  #err : Text;
};

let resultOk : Result = #ok(42);
let resultErr : Result = #err("Something went wrong");
```

This will become important later when we discuss [switch expression](../switch-and-variants).

## Exercise

Define a variant type `Shape` that represents a circle, rectangle or triangle.

Define a variable `s` and store the circle value in it.
