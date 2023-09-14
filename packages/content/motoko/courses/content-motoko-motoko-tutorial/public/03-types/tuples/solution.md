Using dot notation:

```motoko
func swap(t : (Nat, Nat)) : (Nat, Nat) {
  (t.1, t.0);
};

swap(1, 2);
```

Using destructuring:

```motoko
func swap((a, b) : (Nat, Nat)) : (Nat, Nat) {
  (b, a);
};

swap(1, 2);
```
