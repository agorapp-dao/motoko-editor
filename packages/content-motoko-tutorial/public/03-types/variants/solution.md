Variant type represents a set of options:

```motoko
type Day = {#Sun; #Mon; #Tue; #Wed; #Thu; #Fri; #Sat};

let day : Day = #Wed;
```

// TODO: revisit this later
You can assign a type to each option:

```motoko
type Result = {
  #ok : Nat;
  #err : Text;
}
```
