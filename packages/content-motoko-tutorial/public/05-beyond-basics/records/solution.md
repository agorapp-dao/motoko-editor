```motoko
type Book = {
  title : Text;
  author : Text;
  publicationYear : Nat;
};

func getBookAge(book : Book) : Nat {
  2023 - book.publicationYear
};

let book : Book = {
  title = "Disrupted: My Misadventure in the Start-Up Bubble";
  author = "Dan Lyons";
  publicationYear = 2016;
};

getBookAge(book);
```
