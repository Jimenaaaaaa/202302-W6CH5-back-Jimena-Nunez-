/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import { Response, Request, NextFunction } from 'express';
import { Repo } from '../repo/repo.interface.js';
import createDebug from 'debug';
import { User } from '../entities/user.js';
import { HTTPError } from '../errors/errors.js';
import { Auth, PayloadToken } from '../helpers/auth.js';
const debug = createDebug('W6:controller');

export class UserController {
  constructor(public repo: Repo<User>) {
    debug('instantiate');
  }

  async register(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('register: post');
      if (!req.body.email || !req.body.password)
        throw new HTTPError(
          401,
          'error de autenticacion',
          'Invalid Email or password'
        );

      req.body.password = await Auth.hash(req.body.password);
      req.body.dogs = [];
      const data = await this.repo.create(req.body);

      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('register: post');
      if (!req.body.email || !req.body.password)
        throw new HTTPError(
          401,
          'error de autenticacion',
          'Invalid Email or password'
        );
      const data = await this.repo.search({
        key: 'email',
        value: req.body.email,
      });

      if (!data.length)
        throw new HTTPError(404, 'unauthorized', 'email not found');

      if (!(await Auth.compare(req.body.password, data[0].password)))
        throw new HTTPError(401, 'Unauthorized', 'Password does not match');
      const payload: PayloadToken = {
        id: data[0].id,
        email: req.body.email,
        role: 'admin',
      };
      const token = Auth.createJWT(payload);
      resp.status(200);
      resp.json({
        results: { token },
      });
    } catch (error) {
      next(error);
    }
  }
}
