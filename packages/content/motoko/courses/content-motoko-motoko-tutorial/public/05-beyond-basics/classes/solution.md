```motoko
class Counter() {
  var counter = 0;

  public func increment() {
    counter += 1;
  };

  public func get() : Nat {
    counter;
  };
};

let c = Counter();
c.increment();
c.increment();
c.get();
```
