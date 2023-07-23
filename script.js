// Define a Book class with properties: title, author, pages, read.
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// Define a Library class which contains books and operations on them.
class Library {
  // Initialize an empty array of books, and grab necessary HTML elements
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

    // Bind methods to the instance's context
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.addBookToLibrary = this.addBookToLibrary.bind(this);

    // Attach event listeners to the HTML elements
    this.newBookBtn.addEventListener('click', this.openModal);
    this.closeBtn.addEventListener('click', this.closeModal);
    this.overlay.addEventListener('click', this.closeModal);
    this.addBookBtn.addEventListener('click', this.addBookToLibrary);
  }

  // Method to show modal
  openModal() {
    this.modal.classList.remove('hidden');
    this.overlay.classList.remove('hidden');
  }

  // Method to hide modal
  closeModal() {
    this.modal.classList.add('hidden');
    this.overlay.classList.add('hidden');
  }

  // Method to create a new book from the form, add it to the library, and re-render the library
  addBookToLibrary(event) {
    event.preventDefault();

    const form = this.form;

    // Run the validation checks for title, author, and pages
    if (
      !form.title.value ||
      form.title.value[0] === ' ' ||
      !form.author.value ||
      form.author.value[0] === ' ' ||
      !/^[a-zA-Z\s]*$/.test(form.author.value) ||
      !form.pages.value ||
      form.pages.value[0] === ' ' ||
      !/^\d+$/.test(form.pages.value)
    ) {
      alert(
        'There are errors in the form. Please correct them before submitting.'
      ); // Show an alert if there are errors
      return; // If any validation checks fail, exit the function early
    }

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

  // Method to remove a book from the library and re-render the library
  removeBookFromLibrary(book) {
    const index = this.books.indexOf(book);
    if (index >= 0) {
      this.books.splice(index, 1);
      this.render();
    }
  }

  // Method to render all books in the library
  render() {
    // First, clear out any existing books
    while (this.libraryElement.firstChild) {
      this.libraryElement.removeChild(this.libraryElement.firstChild);
    }

    // Then, create and append new book elements
    for (const book of this.books) {
      this.createBook(book);
    }
  }

  // Method to create a new book element and append it to the library
  createBook(book) {
    // Create the container for each book
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.setAttribute('data-index', this.books.indexOf(book));

    // Create and append elements for the book's title, author, and number of pages
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

    // Create and append a button to toggle whether the book has been read
    const readButton = document.createElement('button');
    readButton.classList.add('readBtn');
    readButton.textContent = book.read ? 'Read' : 'Not Read';
    readButton.style.backgroundColor = book.read ? '#63da63' : '#e04f63';
    readButton.addEventListener('click', () => {
      book.read = !book.read;
      this.render();
    });
    bookElement.appendChild(readButton);

    // Create and append a button to remove the book
    const removeButton = document.createElement('button');
    removeButton.classList.add('removeBtn');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      this.removeBookFromLibrary(book);
    });
    bookElement.appendChild(removeButton);

    // Append the book to the library
    this.libraryElement.appendChild(bookElement);
  }
}

const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const titleError = document.querySelector('#titleError');
const authorError = document.querySelector('#authorError');
const pagesError = document.querySelector('#pagesError');

// RegExp for title and author: not starting with space and no special characters
const textRegEx = /^[a-zA-Z0-9][a-zA-Z0-9\s]*$/;

// RegExp for pages: only digits, no spaces or special characters
const pagesRegEx = /^\d+$/;

// Event listener for title
title.addEventListener('input', (e) => {
  if (e.target.value[0] === ' ') {
    title.setCustomValidity('Cannot start with a space');
    showError(title, titleError);
  } else if (!e.target.value) {
    title.setCustomValidity('Field cannot be empty');
    showError(title, titleError);
  } else {
    title.setCustomValidity(''); // clear the custom message
    clearError(title, titleError);
  }
});

// Event listener for author
author.addEventListener('input', (e) => {
  if (e.target.value[0] === ' ') {
    author.setCustomValidity('Cannot start with a space');
    showError(author, authorError);
  } else if (!/^[a-zA-Z\s]*$/.test(e.target.value)) {
    author.setCustomValidity('Only letters allowed');
    showError(author, authorError);
  } else if (!e.target.value) {
    author.setCustomValidity('Field cannot be empty');
    showError(author, authorError);
  } else {
    author.setCustomValidity(''); // clear the custom message
    clearError(author, authorError);
  }
});

// Event listener for pages
pages.addEventListener('input', (e) => {
  if (e.target.value[0] === ' ') {
    pages.setCustomValidity('Cannot start with a space');
    showError(pages, pagesError);
  } else if (!/^\d+$/.test(e.target.value)) {
    pages.setCustomValidity('Only numbers allowed');
    showError(pages, pagesError);
  } else if (!e.target.value) {
    pages.setCustomValidity('Field cannot be empty');
    showError(pages, pagesError);
  } else {
    pages.setCustomValidity(''); // clear the custom message
    clearError(pages, pagesError);
  }
});

function showError(inputElement, errorElement) {
  if (inputElement.validity.valid) {
    errorElement.textContent = '';
    errorElement.className = 'error';
  } else {
    errorElement.textContent = inputElement.validationMessage;
    errorElement.style.display = 'block'; // show error message
  }
}

function clearError(inputElement, errorElement) {
  if (inputElement.validity.valid) {
    errorElement.textContent = '';
    errorElement.className = 'error';
    errorElement.style.display = 'none'; // hide error message
  }
}

// Instantiate a new library and render it
const library = new Library();
library.render();
