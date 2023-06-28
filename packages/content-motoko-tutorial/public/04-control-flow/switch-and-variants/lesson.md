Switch becomes pretty useful when used together with [Variants](/editor/motoko-tutorial/variants):

```motoko
type Day = {#Sun; #Mon; #Tue; #Wed; #Thu; #Fri; #Sat};

func toText(d : Day) : Text {
  switch d {
     case (#Sun) "Sunday";
     case (#Mon) "Monday";
     case (#Tue) "Tuesday";
     case (#Wed) "Wednesday";
     case (#Thu) "Thursday";
     case (#Fri) "Friday";
     case (#Sat) "Saturday";
   };
};

toText(#Thu);
```

The switch expression has to be exhaustive, i.e. it has to cover all possible values of the variant type:

```motoko
type Day = {#Sun; #Mon; #Tue; #Wed; #Thu; #Fri; #Sat};

func toText(d : Day) : Text {
  // fails with `this switch does not cover value ...`
  switch d {
     case (#Sun) "Sunday";
     case (#Mon) "Monday";
   };
};
```

But **pattern matching** is what makes switch really powerful. Remember that variant type can hold a
value. In Motoko this is often used to represent the result of some operation:

```motoko
type Result = {
  #ok : Nat;
  #err : Text;
};

let resultOk : Result = #ok(42);
let resultErr : Result = #err("Something went wrong");
```

With pattern matching we can easily extract the value from the variant:

```motoko
let result = doSomething();

switch (result) {
  case (#ok(n)) D.print("ok" # debug_show(n));
  case (#err(msg)) D.print("Failed: " # msg);
};
```

## Exercise

Complete the implementation of function `processResult. This function should print the result
of the operation:

1. `Operation successful, received: ` followed by the number
2. Or `Operation failed with error: ` followed by the error message.
