class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.books = [];
    this.modal = document.querySelector('.modal');
    this.overlay = document.querySelector('.overlay');
    this.closeBtn = document.querySelector('.close-modal');
    this.newBookBtn = document.querySelector('.newBook');
    this.addBookBtn = document.querySelector('#addBtn');
    this.form = document.querySelector('form');
    this.libraryElement = document.getElementById('library');
    this.newBook = null;

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.addBookToLibrary = this.addBookToLibrary.bind(this);

    this.newBookBtn.addEventListener('click', this.openModal);
    this.closeBtn.addEventListener('click', this.closeModal);
    this.overlay.addEventListener('click', this.closeModal);
    this.addBookBtn.addEventListener('click', this.addBookToLibrary);
  }

  openModal() {
    this.modal.classList.remove('hidden');
    this.overlay.classList.remove('hidden');
  }

  closeModal() {
    this.modal.classList.add('hidden');
    this.overlay.classList.add('hidden');
  }

  addBookToLibrary(event) {
    event.preventDefault();

    const form = this.form;
    const newBook = new Book(
      form.title.value,
      form.author.value,
      form.pages.value,
      form.read.checked
    );

    this.books.push(newBook);
    form.reset();
    this.closeModal();
    this.render();
  }

  removeBookFromLibrary(book) {
    const index = this.books.indexOf(book);
    if (index >= 0) {
      this.books.splice(index, 1);
      this.render();
    }
  }

  render() {
    while (this.libraryElement.firstChild) {
      this.libraryElement.removeChild(this.libraryElement.firstChild);
    }

    for (const book of this.books) {
      this.createBook(book);
    }
  }

  createBook(book) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.setAttribute('data-index', this.books.indexOf(book));

    const titleElement = document.createElement('div');
    titleElement.classList.add('title');
    titleElement.textContent = book.title;
    bookElement.appendChild(titleElement);

    const authorElement = document.createElement('div');
    authorElement.classList.add('author');
    authorElement.textContent = book.author;
    bookElement.appendChild(authorElement);

    const pagesElement = document.createElement('div');
    pagesElement.classList.add('pages');
    pagesElement.textContent = `${book.pages} pages`;
    bookElement.appendChild(pagesElement);

    const readButton = document.createElement('button');
    readButton.classList.add('readBtn');
    readButton.textContent = book.read ? 'Read' : 'Not Read';
    readButton.style.backgroundColor = book.read ? '#63da63' : '#e04f63';
    readButton.addEventListener('click', () => {
      book.read = !book.read;
      this.render();
    });
    bookElement.appendChild(readButton);

    const removeButton = document.createElement('button');
    removeButton.classList.add('removeBtn');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      this.removeBookFromLibrary(book);
    });
    bookElement.appendChild(removeButton);

    this.libraryElement.appendChild(bookElement);
  }
}

const library = new Library();
library.render();
