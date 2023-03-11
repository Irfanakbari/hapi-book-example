import books from '../database/books.js';

const saveBook = (bookData) => {
  books.push(bookData);
};

const getAllBooks = () => books.map(({ id, name, publisher }) => ({ id, name, publisher })) ?? [];
const getBookById = (bookId) => {
  const book = books.filter((n) => n.id === bookId)[0];
  if (!book) {
    return null;
  }
  return book;
};

const updateBook = (
  bookId,
  name,
  year,
  author,
  summary,
  publisher,
  pageCount,
  readPage,
  reading,
  updatedAt,
) => {
  const index = books.findIndex((book) => book.id === bookId);
  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };
  return books[index];
};

const deleteBook = (bookId) => {
  const index = books.findIndex((book) => book.id === bookId);
  books.splice(index, 1);
};

export {
  getBookById, saveBook, getAllBooks, updateBook, deleteBook,
};
