import http from 'http';
import { app } from './apps.js';
import { dbConnect } from './db/db.connect.js';
import createDebug from 'debug';

const debug = createDebug('W6');
const port = process.env.PORT || 3000;
const server = http.createServer(app);


dbConnect()
  .then((mongoose) => {

    server.listen(port);

    debug(mongoose.connection.db.databaseName);
  })
  .catch((error) => server.emit('error', error));

server.on('error', (error) => {
  debug('Server error', error.message);
});

server.on('listening', () => {
  debug('Listening in port: ' + port);
});
