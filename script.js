const myLibrary = [];
const container = document.querySelector("div.container");
let cards = [];
const addBooksButton = document.querySelector("button.add-books");
const body = document.querySelector("body");
const form = document.forms.newBook;
const closeBtn = document.querySelector("#closeBtn");
const dialog = document.getElementById('add-book');

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

Book.prototype.toggleRead = function() {
    if (this.isRead === false) {
      return this.isRead = true;
    }
    else {
      return this.isRead = false;
    }
}


console.log(Book.prototype);

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


  this.buttonContainer = document.createElement("div");
  this.changeReadBtn = document.createElement("button");
  this.remove = document.createElement("button");
  this.remove.setAttribute("data-id", "");
  this.changeReadBtn.setAttribute("data-id", "");

  this.card.appendChild(this.title);
  this.card.appendChild(this.author);
  this.card.appendChild(this.pages);
  this.card.appendChild(this.isRead);
  this.card.appendChild(this.buttonContainer);
  this.buttonContainer.appendChild(this.remove);
  this.buttonContainer.appendChild(this.changeReadBtn);

  this.title.classList.add("title");
  this.author.classList.add("author");
  this.pages.classList.add("pages")
  this.isRead.classList.add("isRead");
  this.remove.classList.add("remove");
  this.buttonContainer.classList.add("card-button-container");
  this.changeReadBtn.classList.add("change-read-status");

  this.remove.textContent = "Remove";
  this.changeReadBtn.textContent = "Toggle Read";


  this.remove.addEventListener("click", e => removeBook(e));
  this.changeReadBtn.addEventListener("click", function(e) {
    const bookIndex = getBookIndexById(e);
    console.log(bookIndex)
    myLibrary[bookIndex].toggleRead();
    console.log(myLibrary[bookIndex]);
    resetCards();
    displayBooks();
  });

}

function addBookToLibrary(title, author, pages, isRead) {
  let newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  console.log(myLibrary);
}



function resetCards() {
  for (card of cards) {
    card.card.remove();
  }
  cards = [];
}


function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    cards.push(new Card());
    cards[i].title.textContent = `Title: ${myLibrary[i].title}`;
    cards[i].author.textContent = `Author: ${myLibrary[i].author}`;
    cards[i].pages.textContent = `${myLibrary[i].pages} pages long`;
    cards[i].isRead.textContent = `${myLibrary[i].isRead ? 'Read' : 'Unread'}`;
    cards[i].remove.setAttribute("data-id", myLibrary[i].id);
    cards[i].changeReadBtn.setAttribute("data-id", myLibrary[i].id);
  }
}

function getBookIndexById(e) {
  const id = e.target.getAttribute("data-id");
  console.log(id);
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id === id) {
      return i;
      break
    }
  }
}

function removeBook(e) {
  const id = e.target.getAttribute("data-id");
  console.log(id);
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id === id) {
      myLibrary.splice(i, 1);
    }
  }

  e.target.parentNode.parentNode.remove();
  console.log(myLibrary);
}


addBookToLibrary('Foundation', 'Isaac Asimov', 400, true);
addBookToLibrary('Dune', 'Frank Herbert', 900, false);

displayBooks(myLibrary);

addBooksButton.addEventListener("click", () => dialog.showModal());

closeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (form.title.value === '' || form.author.value === ''
    || form.pages.value === '') {
  }
  else {
    let title = form.title.value;
    let author = form.author.value;
    let pages = form.pages.value;
    let isRead = form.isRead.checked;

    addBookToLibrary(title, author, pages, isRead);
    resetCards();
    displayBooks();
    dialog.close();
  }


});


