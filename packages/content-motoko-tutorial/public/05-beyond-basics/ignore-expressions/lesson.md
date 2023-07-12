In Motoko, the `ignore` keyword is used to deliberately disregard the result of an expression. This
is particularly useful when you call a function that returns a value, but you are not interested in
the result. Consider the following example:

```motoko
// Adds like to a blog post and returns the current
// number of likes.
func like(blogPostId: Int) : Nat {
  // ...
}

func commentAndLike(blogPostId: Int, comment: Text) {
  // ...
  like(blogPostId);
}
```

Attempting to compile this code will yield an error:

```
Expression of type Nat cannot produce expected type ()
```

The error occurs because the `like` function is called as the last expression in the `commentAndLike`
function. As such, it is evaluated as the return value of the `commentAndLike` function. However,
`commentAndLike` does not return `Nat`, it returns `()` (no value). This leads to a type mismatch.

You can fix this by adding the `ignore` keyword before the call to `like`:

```motoko
func commentAndLike(blogPostId: Int, comment: Text) {
  // ...
  ignore like(blogPostId);
}
```

## Exercise

We have a function called `trackMe`, and we want to count the number of times this function has
been called. Please finish the implementation on the right.
