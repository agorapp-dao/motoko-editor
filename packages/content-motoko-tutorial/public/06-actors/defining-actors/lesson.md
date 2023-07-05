Concurrency in the Internet Computer is based on **actor model**. In this model, an actor is an
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

  public func listBooks() : async [Text] {
    Buffer.toArray(books);
  }

};
```

There are some important things to point out here:

- There is always only one instance of an actor in the system, making it a [singleton](TODO:link).
- The Actor has a state, which is defined by the variables declared inside the actor. This state is
  always private, marking it with `public` keyword will result in a compilation error.
- Actors can receive messages from other actors. These messages are represented by the async functions.

## Exercise

Create an actor called `Counter`, which will have a state variable `count` initialized to `0`.
The actor should handle these messages:

- `increment` - increments the `count` by `1`
- `getCount` - returns the current count
