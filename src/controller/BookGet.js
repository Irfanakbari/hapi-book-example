import { getAllBooks, getBookById } from '../model/BookModel.js';
import books from '../database/books.js';

const BookGetAll = async (request, h) => h.response({
  status: 'success',
  data: {
    books: getAllBooks(),
  },
}).code(200);

const BookGetById = async (request, h) => {
  const { bookId } = request.params;
  const book = getBookById(bookId);
  if (book) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};

const BookGetFiltered = async (request, h) => {
  const { name, reading, finished } = request.query;
  let filteredBooks = books;

  if (name) {
    const queryName = name.toLowerCase();
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(queryName));
  }

  if (reading === '1') {
    const queryReading = true;
    filteredBooks = filteredBooks.filter((book) => book.reading === queryReading);
  } else if (reading === '0') {
    const queryReading = false;
    filteredBooks = filteredBooks.filter((book) => book.reading === queryReading);
  }

  if (finished === '1') {
    const queryFinished = true;
    filteredBooks = filteredBooks.filter((book) => book.finished === queryFinished);
  } else if (finished === '0') {
    const queryFinished = false;
    filteredBooks = filteredBooks.filter((book) => book.finished === queryFinished);
  }

  const newBooks = filteredBooks.map(({ id, name: n, publisher }) => ({ id, name: n, publisher }));
  console.log({
    status: 'success',
    data: {
      books: newBooks,
    },
  });
  return h.response({
    status: 'success',
    data: {
      books: newBooks,
    },
  }).code(200);
};

export { BookGetAll, BookGetById, BookGetFiltered };
