In addition to [Options](../options) and [Results](../results), Motoko gives you another way how to deal with errors: **asynchronous errors**.

Any asynchronous function has the ability to throw an error:

```motoko
import D "mo:base/Debug";
import Error "mo:base/Error";

func fetchData() : async Data {
  let conn = await connectDb();
  if (conn == null) {
    throw Error.reject("Failed to connect to DB");
  };
  // ...
};
```

The caller of the function can then handle the error using a `try`/`catch` block:

```motoko
try {
  let data = await fetchData();
  // ...
} catch (err) {
  D.print("Failed to fetch data: " # Error.message(err));
};
```

It's important to note that **errors can only be thrown and caught within asynchronous functions**. In synchronous functions, [Results](../results) should be used instead.

You should use asynchronous errors only for exceptional cases where you're not able to recover. Furthermore, if you expect that the caller will want to handle the error, use `Result` instead to communicate that the function can potentially return an error.

## Exercise

Create an asynchronous function `divide()`, which takes two parameters `a` and `b` and returns `a / b`. If `b` is zero, the function should throw an error.

Create another asynchronous function `main()` that calls `divide()`. It prints the result, or prints the error message if the error has been thrown.

Call the `main()` function to start the program.
