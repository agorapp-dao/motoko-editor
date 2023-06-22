import D "mo:base/Debug";

let balance = 1000;
balance := balance + 100;

D.print("Current balance: " # debug_show(balance));
