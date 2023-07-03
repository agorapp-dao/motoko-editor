Motoko allows you to split your code into multiple modules, where each module sits in its own file.
These modules can then be used across your project, and even across projects.

To create a module, you create a file with the module name and put the `module` keyword in it:

```motoko
// MyModule.mo

module {

  public func hello() : Text {
    "Greetings from MyModule!";
  };

};
```

The `module` keyword groups together variables, functions and other declarations into a single unit.

Note that similar to objects, module members have visibility and are `private` by default. To allow
other modules to use the members, you have to mark them with a `public` modifier.

To use a module in another file, you can import it using the `import` keyword:

```motoko
// main.mo

import MyModule "MyModule";

MyModule.hello(); // "Greetings from MyModule!"
```

## Motoko Base Library

Motoko provides a [base library](https://internetcomputer.org/docs/current/motoko/main/base/) that
contains many useful modules. We have already seen some of the modules in this tutorial, such as
`Debug`, `Text` and `Nat`.

To use a module from the base library, import it with the `mo:base/` prefix:

```motoko
import Time "mo:base/Time";

Time.now();
```

## Exercise

Create a module `Math` with a function `add` that takes two integers and returns their sum.

Then import the module in `main.mo` and use the `add` function to add two numbers.
