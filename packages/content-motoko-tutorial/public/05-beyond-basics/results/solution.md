```motoko
import D "mo:base/Debug";

type Result<Ok, Err> = { #ok : Ok; #err : Err };
type LoginError = { #wrongPassword; #emptyPassword; };

func login(username : Text, password : Text) : Result<Text, LoginError> {
  if (password == "") {
    #err(#emptyPassword);
  } else if (username != "admin" or password != "1234") {
    #err(#wrongPassword);
  } else {
    let sessionId = "sid:42";
    #ok(sessionId);
  }
};

let result = login("admin", "1234");

switch (result) {
  case (#ok(sessionId)) D.print("Login successful, session id: " # sessionId);
  case (#err(#emptyPassword)) D.print("Password is required");
  case (#err(#wrongPassword)) D.print("Wrong password");
}
```
