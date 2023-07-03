Simple solution to the exercise:

```motoko
func ping() : async Text {
  "pong";
};

let result = await ping();
```

What happens if you await future value twice?

```motoko
import D "mo:base/Debug";

func ping() : async Text {
  D.print("handle ping");
  "pong";
};

let future = ping();

// note that ping() function is executed only once
let res1 = await future;
let res2 = await future;
D.print("res1: " # res1 # ", res2: " # res2);
```

What happens if you do not wait for the value? Notice that the execution continues after the function
call and the function body is executed later:

```motoko
import D "mo:base/Debug";

func ping() : async Text {
  D.print("handle ping");
  "pong";
};

let future = ping();
D.print("ping called");
```
