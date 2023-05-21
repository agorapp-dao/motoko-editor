In the above snippet we are asserting that any compiler version between ***0.6.2*** and the next breaking change - in our case, ***0.7.0*** - will be able to compile our file.

Lastly, after declaring our compiler version, we can declare our contract. ***Contracts*** are similar to classes in object-oriented programming. \
Most of the logic of our codebase will be encapsulated in contracts.

Contract declarations are of the following form:
```motoko  
contract FirstContract {}
```
