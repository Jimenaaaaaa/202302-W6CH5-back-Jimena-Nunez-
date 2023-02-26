import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { dogsRouter } from './router/dogs.router.js';

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
