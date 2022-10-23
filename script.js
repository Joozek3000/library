const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-modal');
const newBookBtn = document.querySelector('.newBook');
const addBook = document.querySelector('#addBtn');

let myLibrary = [];
let newBook;

class Book {
  constructor(title, author, pages, read) {
    this.title = form.title.value;
    this.author = form.author.value;
    this.pages = form.pages.value;
    this.read = form.read.checked;
  }
}

//  Modal functionallity
const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

newBookBtn.addEventListener('click', openModal);

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//  adding book to library
addBook.addEventListener('click', addBookToLibrary);

function addBookToLibrary(event) {
  event.preventDefault();

  newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  form.reset();
  closeModal();
  render();
}

const render = () => {
  const display = document.getElementById('library');
  const books = document.querySelectorAll('.book');
  books.forEach((book) => display.removeChild(book));

  for (let i = 0; i < myLibrary.length; i++) {
    createBook(myLibrary[i]);
  }
};

function createBook(item) {
  const library = document.querySelector('#library');
  const bookDiv = document.createElement('div');
  const titleDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const pagesDiv = document.createElement('div');
  const readBtn = document.createElement('button');
  const removeBtn = document.createElement('button');

  bookDiv.classList.add('book');
  bookDiv.setAttribute('id', myLibrary.indexOf(item));

  titleDiv.textContent = item.title;
  titleDiv.classList.add('title');
  bookDiv.appendChild(titleDiv);

  authorDiv.textContent = item.author;
  authorDiv.classList.add('author');
  bookDiv.appendChild(authorDiv);

  pagesDiv.textContent = item.pages + ' pages';
  pagesDiv.classList.add('pages');
  bookDiv.appendChild(pagesDiv);

  readBtn.classList.add('readBtn');
  bookDiv.appendChild(readBtn);
  if (item.read === false) {
    readBtn.textContent = `Not Read`;
    readBtn.style.backgroundColor = '#e04f63';
  } else {
    readBtn.textContent = `Read`;
    readBtn.style.backgroundColor = '#63da63';
  }
  readBtn.addEventListener('click', () => {
    item.read = !item.read;
    render();
  });

  removeBtn.textContent = 'Remove';
  removeBtn.classList.add('removeBtn');
  bookDiv.appendChild(removeBtn);
  removeBtn.addEventListener('click', () => {
    myLibrary.splice(myLibrary.indexOf(item), 1);
    render();
  });

  library.appendChild(bookDiv);
}
