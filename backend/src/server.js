const server = require('./app');

server.listen(3333, () => {
  console.log('Server Started at http://localhost:3333');
});
