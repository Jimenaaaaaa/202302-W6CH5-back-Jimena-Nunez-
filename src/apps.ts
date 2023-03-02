import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { dogsRouter } from './routers/dogs.router.js';
import { CustomError } from './errors/errors.js';

import createDebug from 'debug';
import { usersRouter } from './routers/users.router.js';
const debug = createDebug('W6:app');

export const app = express();

app.disable('x-powered-by');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

const corsOptions = {
  origin: '*',
};

app.use((_req, _resp, next) => {
  next();
});

app.use('/dogs', dogsRouter);
app.use('/users', usersRouter);

app.use(
  (error: CustomError, _req: Request, resp: Response, next: NextFunction) => {
    debug('Soy un middleware');
    const status = error.statusCode || 500;
    const statusMessage = error.statusMessage || 'Internal server error';
    resp.status(status);

    resp.json({
      error: [
        {
          status,
          statusMessage,
        },
      ],
    });
  }
);
