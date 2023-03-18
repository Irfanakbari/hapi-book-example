import Hapi from '@hapi/hapi';
import routes from './src/routes/routes.js';

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
  });
  server.route(routes);

  await server.start();
  return server;
};

init().then((r) => {
  console.log(`Server running at: ${r.info.uri}`);
});
