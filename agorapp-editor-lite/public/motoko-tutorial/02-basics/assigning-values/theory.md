There are two ways how you can assign value to a variable in Motoko. The first one is to specify
the value when you declare the variable:

```motoko
var x = 10;
```

Later when you want to change the value of the variable, you can use the `:=` operator:

```motoko
x := 20;
```

## Exercise

Define the variable `balance` with an initial value of 50. Then add 100 to it. Program should output
`Current balance: 150`.
