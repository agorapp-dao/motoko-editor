**Math.mo:**

```motoko
module {

  public func add(a : Int, b : Int) : Int {
    a + b;
  };

};
```

**main.mo:**

```motoko
import Math "Math";

Math.add(1, 2); // 3
```
