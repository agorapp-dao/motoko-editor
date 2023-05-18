Let's start going through the basics of the layout of a solidity file.

All Solidity files require a ```pragma``` statement to sit at their very beginning. The pragma statement ensures that the code of a file will use a compatible version of the solidity compiler.

As solidity is an actively developed language, new features are often added or removed on each release. These changes follow the rules of [semantic versioning](https://semver.org/).

```motoko
func increment(n: Nat): Nat {
  count := count + n;
  count;
};

increment(5);
print("test");
````

In the above pragma statement, we are asserting that the code that will follow can only be compiled by the compiler version 0.6.0. Attempting to compile the same file with any other compiler version will return an error.

Pragma statements, however, can also allow for some flexibility. \
As ***solidity versions are always of the form "0.x.0"or "x.0.0"***, only the latter form means that the new release is introducing ***breaking changes*** to the current version of the language!

```motoko
pragma solidity ^0.6.2;
```

In the above snippet we are asserting that any compiler version between ***0.6.2*** and the next breaking change - in our case, ***0.7.0*** - will be able to compile our file.

Lastly, after declaring our compiler version, we can declare our contract. ***Contracts*** are similar to classes in object-oriented programming. \
Most of the logic of our codebase will be encapsulated in contracts.

Contract declarations are of the following form:
```motoko  
contract FirstContract {}
```
