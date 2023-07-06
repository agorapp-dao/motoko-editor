import D "mo:base/Debug";

actor MyInfo {

  public func whoAmI() : async Text {
    // return the caller's principal
    "todo"
  };

};

await MyInfo.whoAmI();
