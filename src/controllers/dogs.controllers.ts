/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import { HTTPError } from '../errors/errors.js';
import { Response, Request, NextFunction } from 'express';
import { Dog } from '../entities/dog.js';
import { Repo } from '../repo/repo.interface.js';
import createDebug from 'debug';
import { RequestPlus } from '../interceptors/logged.js';
import { User } from '../entities/user.js';
const debug = createDebug('W6:controller');

export class DogsController {
  constructor(public repo: Repo<Dog>, public repoUsers: Repo<User>) {
    debug('instantiate');
  }

  async getAll(_req: Request, resp: Response, next: NextFunction) {
    try {
      debug('getAll');
      const data = await this.repo.query();
      resp.json({
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('get');
      const data = await this.repo.queryId(req.params.id);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async post(req: RequestPlus, resp: Response, next: NextFunction) {
    try {
      debug('post');
      const userId = req.info?.id;

      if (!userId) throw new HTTPError(404, 'Not found', 'user id not found');
      const currentUser = await this.repoUsers.queryId(userId);
      req.body.owner = userId;
      const newDog = await this.repo.create(req.body);

      currentUser.dogs.push(newDog);

      this.repoUsers.update(currentUser);

      resp.json({
        results: [newDog],
      });
    } catch (error) {
      next(error);
    }
  }

  async patch(req: Request, resp: Response, next: NextFunction) {
    try {
      req.body.id = req.params.id ? req.params.id : req.body.id;
      const data = await this.repo.update(req.body);

      resp.json({
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      await this.repo.erase(req.params.id);
      resp.json({
        results: [],
      });
    } catch (error) {
      next(error)
    }
  }
}
