/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import { Response, Request, NextFunction } from 'express';
import { DogStructure } from '../entities/dog.model.copy.js';
import { Repo } from '../repo/repo.interface.js';
import createDebug from 'debug';
const debug = createDebug('W6:controller');
export class DogsController {
  constructor(public repo: Repo<DogStructure>) {
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

  async post(req: Request, resp: Response, next: NextFunction) {
    const data = await this.repo.create(req.body);

    resp.json({
      results: data,
    });
  }

  async patch(req: Request, resp: Response, next: NextFunction) {
    req.body.id = req.params.id ? req.params.id : req.body.id;
    const data = await this.repo.update(req.body);

    resp.json({
      results: data,
    });
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    this.repo.erase(req.params.id);

    resp.json({
      results: [],
    });
  }
}
