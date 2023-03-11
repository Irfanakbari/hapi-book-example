import { nanoid } from 'nanoid';
import { saveBook } from '../model/BookModel.js';

const BookPost = async (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  // Cek apakah client tidak melampirkan properti name pada request body
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }
  // Cek apakah readPage lebih besar dari nilai properti pageCount
  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }
  // Generate nilai id dan insertedAt
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  // Hitung nilai finished
  const finished = pageCount === readPage;
  // Buat objek buku baru
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt: insertedAt,
  };
  // Simpan objek buku ke dalam array books (diasumsikan sebagai variabel global)
  saveBook(newBook);
  // return
  return h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  }).code(201);
};
export default BookPost;
