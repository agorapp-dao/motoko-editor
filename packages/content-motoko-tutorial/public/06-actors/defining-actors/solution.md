```motoko
actor Counter {
  var count = 0;

  public func increment() : async () {
    count += 1;
  };

  public func getCount() : async Nat {
    count;
  };
};

await Counter.increment();
await Counter.increment();
await Counter.getCount();
```
