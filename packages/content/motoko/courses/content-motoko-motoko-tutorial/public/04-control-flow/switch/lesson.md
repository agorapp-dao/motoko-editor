A switch expression is used to branch execution based on a value:

```motoko
import D "mo:base/Debug";
let name = "John";

switch (name) {
  case ("John") {
    D.print("Hello John");
  };
  case ("Jane") {
    D.print("Hello Jane");
  };
  case _ {
    D.print("Hello stranger");
  };
};
```

In the example above, the switch expression matches the value of the `name` variable against the values provided in the `case` clauses. If the value matches, the code within the corresponding clause is executed.

The `_` case is the default case, and will be executed if none of the other cases match.

Note that both the `switch` expression and each `case` clause need to be terminated with a semicolon.

The `switch` expression is an expression, not a statement. This means that it evaluates to a value:

```motoko
let greeting = switch (name) {
  case ("John") "Hello John";
  case ("Jane") "Hello Jane";
  case _ "Hello stranger";
};

D.print(greeting);
```

Notice that we have omitted the curly brackets in the `case` clauses. This is possible because each `case` clause contains a single expression.

## Exercise

You are given a text representing a day of the week. Write a program that performs the following tasks:

- If the day is `Monday`, print `Start of the work week.`
- If the day is `Wednesday`, print `Midweek already!`
- If the day is `Friday`, print `Yay! Weekend is coming.`
- For any other day, print `Just another day.`
