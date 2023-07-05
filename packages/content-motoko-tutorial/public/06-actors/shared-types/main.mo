import Buffer "mo:base/Buffer";

// your code here
actor Library {

  let books = Buffer.Buffer<Text>(0);

  public func addBook(book : Text) : async () {
    books.add(book);
  };

  public func listBooks() : async Buffer.Buffer<Text> {
    books;
  }

};
