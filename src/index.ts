import http from 'http';
import { app } from './apps.js';

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);

server.on('error', () => {});

server.on('listening', () => {
  console.log('Listening in port: ' + port);
});
