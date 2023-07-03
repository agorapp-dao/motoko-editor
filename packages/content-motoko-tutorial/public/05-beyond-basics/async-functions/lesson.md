When writing programs for the Internet Computer, you will quite often need to perform asynchronous
operations. These operations do not execute immediately, but at some point in the future.

The function that returns the result in the future is marked with the `async` keyword:

```motoko
func loadData() : async Text {
  // ... some asynchronous code
};
```

To wait for the value to be available, you can use the `await` keyword:

```motoko
let data = await loadData();
```

// TODO: how to represent Future type in Motoko

## Exercise

Write an asynchronous function `ping`, that returns the string `"pong"`.

Try what happens when you await the future value twice.

Try what happens when you do not wait for the value. Which line of code gets executed first after
`ping` is called? The one inside the `ping` function, or the one after the function call?
