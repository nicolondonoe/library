const myLibrary = [];

function Book(name, author, pages, isRead) {
  if (!new.target) {
    throw Error("Can't call constructor function without 'new'");
  }
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(name, author, pages, isRead) {
  let newBook = new Book(name, author, pages, isRead);
  myLibrary.push(newBook);
}

addBookToLibrary('Foundation', 'Isaac Asimov', 400, true);
addBookToLibrary('Dune', 'Frank Herbert', 900, false);

console.log(myLibrary);
