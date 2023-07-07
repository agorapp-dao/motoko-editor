import D "mo:base/Debug";

// TODO: make class generic
class Pair(_first : Text, _second : Text) {

  public var first = _first;
  public var second = _second;

};

let pair1 = Pair("one", "two");
D.print("pair1: " # debug_show(pair1));

// TODO: create `pair2` that is a pair of two `Nat`s

