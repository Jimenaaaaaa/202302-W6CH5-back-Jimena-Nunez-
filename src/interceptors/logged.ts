import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/errors.js';
import { Auth, PayloadToken } from '../helpers/auth.js';
import createDebug from 'debug';
const debug = createDebug('W6:logged');

export interface RequestPlus extends Request {
  info?: PayloadToken;
}

export function logged(req: RequestPlus, resp: Response, next: NextFunction) {
  try {
    const authHeader = req.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer'))
      throw new HTTPError(
        498,
        'Invalid token logged',
        'incorrect in authHeader'
      );

    const token = authHeader.slice(7);
    const payload = Auth.verifyJWTGetPayload(token);

    req.info = payload;
    next();
  } catch (error) {
    next(error);
  }
}
