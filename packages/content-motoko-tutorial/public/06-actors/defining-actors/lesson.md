Concurrency in the Internet Computer is based on the **actor model**. In this model, an actor is an
independent entity that has the ability to communicate by receiving and sending messages to other
actors. Each actor can process one message at a time, which means it works in a single-threaded manner.

Multiple actors can operate concurrently on the Internet Computer though. Each actor runs independently
of the others, but all can work at the same time, which allows for parallel execution of tasks and
operations.

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

The Actor has a state, which is defined by the variables declared inside the actor. This state is
always private, marking it with `public` keyword would result in a compilation error.

Messages are represented by the async functions. These messages can be send by end users or other
actors.

There is always only one instance of the actor in the system, making it a [singleton](TODO:link).

Your program is being executed on the Internet Computer on several nodes. When sending messages to
actors that change actor state, it takes some time for the nodes to reach consensus. You can opt-out
from this by adding the `query` keyword to the function declaration. In this case the function will
return immediately with the last known state.

## Exercise

Create an actor called `Counter`, which will have a state variable `count` initialized to `0`.
The actor should handle these messages:

- `increment` - increments the `count` by `1`
- `getCount` - returns the current count
