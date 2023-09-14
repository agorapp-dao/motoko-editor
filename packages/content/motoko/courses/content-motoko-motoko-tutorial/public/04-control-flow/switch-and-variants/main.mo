import D "mo:base/Debug";

type Result = {
  #ok : Nat;
  #err : Text;
};

func processResult(res : Result) {
  // your code here
};

processResult(#ok(42));
processResult(#err("Permission denied"));
