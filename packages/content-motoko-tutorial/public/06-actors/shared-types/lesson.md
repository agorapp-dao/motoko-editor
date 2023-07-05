The outer world communicates with the actor via messages. Actor handles these messages by defining
async functions. Messages are sent over the network, and therefore there are some limitations on the
types you can use for the parameters and return values of these functions.

Motoko limits you to using the so-called **shared types** in the public functions of actors:

- Shared types are always immutable.
- They include primitive values (`Nat`, `Int`, `Float`, `Text`, ...)
- They include tuples, records, variants, and arrays of shared types.

If you use a non-shared type in a public function of an actor, the compiler will complain:

```
type error [M0032], shared function has non-shared return type
```

## Exercise

Code on the right does not compile. Fix it.
