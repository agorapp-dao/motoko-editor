module {

  public class Counter() {
    var counter = 0;

    public func increment() : Nat {
      counter += 1;
      counter;
    };

    public func get() : Nat {
      counter;
    };
  };

}
