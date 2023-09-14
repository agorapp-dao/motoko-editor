```motoko
import Buffer "mo:base/Buffer";

actor Library {

  let books = Buffer.Buffer<Text>(0);

  public func addBook(book : Text) : async () {
    books.add(book);
  };

  public func listBooks() : async [Text] {
    Buffer.toArray(books);
  }
};
```
