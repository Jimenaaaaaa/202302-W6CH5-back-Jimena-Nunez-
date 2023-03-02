import createDebug from 'debug';
import { NextFunction, Response } from 'express';
import { HTTPError } from '../errors/errors.js';
import { Auth } from '../helpers/auth.js';
import { RequestPlus } from './logged.js';

const debug = createDebug('W6:auth');

export function authorized(
  req: RequestPlus,
  resp: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.get('authorization');
    if (!authHeader || authHeader.startsWith('Bearer'))
      throw new HTTPError(
        498,
        'Invalid token authorized',
        'incorrect in authHeader'
      );

    const token = authHeader.slice(6);
    const payload = Auth.verifyJWTGetPayload(token);

    // Req.info = payload;

    next();
  } catch (error) {
    next(error);
  }
}
