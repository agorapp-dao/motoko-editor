In Motoko, the `ignore` keyword is used to deliberately disregard the result of an expression. This
becomes useful when you want to call a function that returns a value, but you are not interested in
the result. Consider the following example:

```motoko
// Adds like to a blog post and returns the number
// of likes.
func like(blogPostId: Int) : Nat {
  // ...
}

func commentAndLike(blogPostId: Int, comment: Text) {
  // ...
  like(blogPostId);
}
```

If you try to compile this code, you will get an error:

```
Expression of type Nat cannot produce expected type ()
```

The reason is that the `like` function returns a value of type `Nat`, but the `commentAndLike` function
does not return any value. The last expression of `commentAndLike` is evaluated as the return value of
the function, and thus we run into a type mismatch.

You can fix this by adding the `ignore` keyword before the call to `like`:

```motoko
func commentAndLike(blogPostId: Int, comment: Text) {
  // ...
  ignore like(blogPostId);
}
```

## Exercise

We have a function `trackMe` and we would like to track the number of times this function has been
called. Finish the implementation on the right.
