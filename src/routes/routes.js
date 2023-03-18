import BookPost from '../controller/BookPost.js';
import { BookGetAll, BookGetById, BookGetFiltered } from '../controller/BookGet.js';
import BookPut from '../controller/BookPut.js';
import BookDelete from '../controller/BookDelete.js';

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => 'Hello World!',
  },
  {
    method: 'POST',
    path: '/books',
    handler: BookPost,
  },
  {
    method: 'GET',
    path: '/books',
    handler: async (request, h) => {
      const { name, reading, finished } = request.query;
      if (name || reading || finished) {
        return BookGetFiltered(request, h);
      }
      return BookGetAll(request, h);
    },
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: BookGetById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: BookPut,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: BookDelete,
  },
];

export default routes;
