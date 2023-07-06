import D "mo:base/Debug";
import Counter "Counter";


let callCount = Counter.Counter();

func trackMe() {
  // TODO: increment the call counter
};

trackMe();
trackMe();
trackMe();

// return the number of times trackMe was called
callCount.get();
