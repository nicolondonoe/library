const myLibrary = [];
const container = document.querySelector("div.container");
const cards = [];


function Book(title, author, pages, isRead) {
  if (!new.target) {
    throw Error("Can't call constructor function without 'new'");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();
}

function Card() {
  if (!new.target) {
    throw Error("Can't call constructor function without 'new'");
  }
  this.card = document.createElement("div");
  container.appendChild(this.card);
  this.card.classList.add("card");

  this.title = document.createElement("div");
  this.author = document.createElement("div");
  this.pages = document.createElement("div");
  this.isRead = document.createElement("div");

  this.card.appendChild(this.title);
  this.card.appendChild(this.author);
  this.card.appendChild(this.pages);
  this.card.appendChild(this.isRead);

  this.title.classList.add("title");
  this.author.classList.add("author");
  this.pages.classList.add("pages")
  this.isRead.classList.add("isRead");
}

function addBookToLibrary(title, author, pages, isRead) {
  let newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

addBookToLibrary('Foundation', 'Isaac Asimov', 400, true);
addBookToLibrary('Dune', 'Frank Herbert', 900, false);


function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    cards.push(new Card());
    cards[i].title.textContent = `Title: ${myLibrary[i].title}`;
    cards[i].author.textContent = `Author: ${myLibrary[i].author}`;
    cards[i].pages.textContent = `${myLibrary[i].pages} pages long`;
    cards[i].isRead.textContent = `${myLibrary[i].isRead ? 'Read' : 'Unread'}` ;
  }
}

displayBooks(myLibrary);


