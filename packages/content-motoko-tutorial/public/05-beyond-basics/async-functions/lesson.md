In Motoko, you can mark a function as asynchronous by using the async keyword. Asynchronous
functions are operations that complete in the future. They return a promise,
also known as a future value:

```motoko
func loadData() : async Text {
  // ... some asynchronous code
};

// loadData() does not return an actual value,
// but a promise, that can be used later to get
// the actual value.
let dataPromise = loadData();
```

To wait for the value to be available, you can use the `await` keyword:

```motoko
let data = await dataPromise;
```

Or you can `await` the result of function call directly:

```motoko
let data = await loadData();
```

## Exercise

Write an asynchronous function `ping`, that returns the string `"pong"`.

Try what happens when you `await` the future value twice.

Try what happens when you do not `await` the value. Which line of code gets executed first after
`ping` is called? The one inside the `ping` function, or the one after the function call?
