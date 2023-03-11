import Hapi from '@hapi/hapi';
import BookPost from './src/controller/BookPost.js';
import { BookGetAll, BookGetById, BookGetFiltered } from './src/controller/BookGet.js';
import BookPut from './src/controller/BookPut.js';
import BookDelete from './src/controller/BookDelete.js';

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => 'Hello World!',
  });

  server.route({
    method: 'POST',
    path: '/books',
    handler: async (request, h) => BookPost(request, h),
  });

  server.route({
    method: 'GET',
    path: '/books',
    handler: async (request, h) => {
      const { name, reading, finished } = request.query;
      if (name || reading || finished) {
        return BookGetFiltered(request, h);
      }
      return BookGetAll(request, h);
    },
  });

  server.route({
    method: 'GET',
    path: '/books/{bookId}',
    handler: (request, h) => BookGetById(request, h),
  });

  server.route({
    method: 'PUT',
    path: '/books/{bookId}',
    handler: (request, h) => BookPut(request, h),
  });

  server.route({
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: (request, h) => BookDelete(request, h),
  });

  await server.start();
  return server;
};

init().then((r) => {
  console.log(`Server running at: ${r.info.uri}`);
});
