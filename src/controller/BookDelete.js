import { deleteBook, getBookById } from '../model/BookModel.js';

const BookDelete = (request, h) => {
  const { bookId } = request.params;

  const isBook = getBookById(bookId);

  if (isBook === null) {
    return h
      .response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      })
      .code(404);
  }

  deleteBook(bookId);

  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  }).code(200);
};

export default BookDelete;
