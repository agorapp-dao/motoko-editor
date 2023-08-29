Motoko allows you to split your code into multiple modules, where each module sits in its own file. These modules can then be used across your entire project and even across different projects.

To create a module, create a file named after the module and put the `module` keyword in it:

```motoko
// MyModule.mo

module {

  public func hello() : Text {
    "Greetings from MyModule!";
  };

};
```

The `module` keyword groups together variables, functions and other declarations into a single unit.

Note that similar to objects, module members have visibility and are `private` by default. To make the members accessible to other modules, you must mark them with the `public` modifier.

To use a module in another file, import it using the `import` keyword:

```motoko
// main.mo

import MyModule "MyModule";

MyModule.hello(); // "Greetings from MyModule!"
```

## Motoko Base Library

Motoko provides a [Base Library](https://internetcomputer.org/docs/current/motoko/main/base/) that contains many useful modules. Some of these modules, such as `Debug`, `Text`, and `Nat`, have already been introduced in this tutorial.

To use a module from the base library, import it with the `mo:base/` prefix:

```motoko
import Time "mo:base/Time";

Time.now();
```

## Exercise

Create a `Math` module that contains an `add` function. This function takes two integers and returns their sum.

Then, in `main.mo`, import the module and use the `add` function to add two numbers.
