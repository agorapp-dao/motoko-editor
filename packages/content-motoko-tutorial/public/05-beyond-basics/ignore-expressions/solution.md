````motoko
import D "mo:base/Debug";
import Counter "Counter";


let callCount = Counter.Counter();

func trackMe() {
  ignore callCount.increment();
};

trackMe();
trackMe();
trackMe();

// return the number of times trackMe was called
callCount.get();
```
````
