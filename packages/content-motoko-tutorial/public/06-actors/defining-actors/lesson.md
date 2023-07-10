Concurrency in the Internet Computer is based on the **actor model**. In this model, an actor is an
independent entity that has the ability to communicate by receiving and sending messages to other
actors. Each actor can process one message at a time, which means it works in a single-threaded manner.

Nevertheless, on the Internet Computer, multiple actors can operate concurrently. While each actor
functions independently from others, they all have the ability to work simultaneously, thereby
enabling parallel task and operation execution.

In Motoko, actors are defined using the `actor` keyword:

```motoko
import Buffer "mo:base/Buffer";

// your code here
actor Library {

  let books = Buffer.Buffer<Text>(0);

  public func addBook(book : Text) : async () {
    books.add(book);
  };

  public query func listBooks() : async [Text] {
    Buffer.toArray(books);
  }

};
```

An actor has a state, defined by the variables declared inside the actor. This state is
always private, and attempting to mark it with the `public` keyword would trigger a compilation
error.

Messages are represented by async functions. These messages can be sent by by either end users or
other actors.

There is always only one instance of the actor in the system, making it a singleton.

Your program is executed on the Internet Computer across multiple nodes. When sending messages to
actors that change the actor state, a certain amount of time is needed for the nodes to reach
consensus on what the latest state is. You can opt-out from this by adding the `query` keyword to
the function declaration, which allows the function to return immediately with the last known state
from an individual node.

## Exercise

Create an actor called `Counter`, which will have a state variable `count` initialized to `0`.
The actor should handle these messages:

- `increment` - increments the `count` by `1`
- `getCount` - returns the current count
