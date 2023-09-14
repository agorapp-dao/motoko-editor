```motoko
import D "mo:base/Debug";

class Pair<T>(_first : T, _second : T) {

  public var first = _first;
  public var second = _second;

};

let pair1 = Pair<Text>("one", "two");
D.print("pair1: " # debug_show(pair1));

let pair2 = Pair<Nat>(1, 2);
D.print("pair2: " # debug_show(pair2));
```
