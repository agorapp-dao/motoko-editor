In addition to Options and Results, Motoko gives you another way how to deal with errors:
**asynchronous errors**.

Any async function can throw an error:

```motoko
import Error "mo:base/Error";

func fetchData() : async Data {
  let conn = await connectDb();
  if (conn == null) {
    throw Error.reject("Failed to connect to DB");
  };
  // ...
};
```

Caller of the function can then catch the error with `try`/`catch` block:

```motoko
try {
  let data = await fetchData();
  // ...
} catch (err) {
  // TODO: how to access the error message?
  D.print("Failed to fetch data");
};
```

An Important thing to note is that you can **throw and catch errors only in async functions**. In
synchronous functions, you have to use [Results](todo: link) instead.

You should use asynchronous errors only for exceptional cases where you're not able to recover. Also,
if you expect that the caller will want to handle the error, use [Results](todo: link) instead to
communicate that function can return an error.

## Exercise

Create an async function `divide`, that takes two parameters `a` and `b` and returns `a / b`. If `b`
is zero, the function should throw an error.

Create an async function `main` that calls `divide`. It prints the result, or prints `"Failed"` if
the error has been thrown.
