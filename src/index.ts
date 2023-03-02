import http from 'http';
import { app } from './apps.js';
import { dbConnect } from './db/db.connect.js';

// Cuando queremos importar de algo y dentro de las lalvecitas no hay nada que importar, es un unico valor
// por defecto. si es asi me la traig con un nombre aleatorio
import createDebug from 'debug';
// Cuando saque algo por consola en elrooter, va a ser W6:rooter. Para lo que sale por la consola
// Sepamos quien lo ha ido tirando
const debug = createDebug('W6');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

// No espera ningun parametro pero me devuelve la promesa de la conexion.
// LE PONGO LA CONEXION A LA BASE DE DATOS ANTES DE PONER AL SERVIDOR A ESCUCHAR, PORQUE SI FALLA TIENE SENTIDO
// QUE NI INTENTE CONECTARSE.
dbConnect()
  .then((mongoose) => {
    // ESTE ES UN PATRON MUY REPETIDO. usamos el then porque el await es demasiado nuevo y el then es corto. 
    // Si va todo bien, levanto mi base d datos
    server.listen(port);

    debug(mongoose.connection.db.databaseName);
    // Aqui le digo que me consolee el nombre de la base de datos

    // Y si no, lo capturo. (throw lanza los errores, pero no los captura.)
  })
  .catch((error) => server.emit('error', error)); // El error primero es el que coge el server on de abajo
// El error blanco es el que le pasa el catch.

// eslint-disable-next-line @typescript-eslint/no-empty-function
server.on('error', (error) => {
  debug('Server error', error.message);
});

server.on('listening', () => {
  debug('Listening in port: ' + port);
});
