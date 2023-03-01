import { DogsController } from './dogs.controllers';
import { Request, Response, NextFunction } from 'express';
import { DogsMongoRepo } from '../repo/dogs.mongo.repo';

describe('Given DogsController ', () => {
  const repo: DogsMongoRepo = {
    create: jest.fn(),
    query: jest.fn(),
    queryId: jest.fn(),
    update: jest.fn(),
    erase: jest.fn(),
    search: jest.fn(),
  };

  const req = {
    body: {},
    params: { id: '' },
  } as unknown as Request;

  const resp = {
    json: jest.fn(),
  } as unknown as Response;

  const next = jest.fn() as NextFunction;
  const controller = new DogsController(repo);
  describe('Get all ', () => {
    test('Then it should ', async () => {
      await controller.getAll(req, resp, next);

      expect(repo.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('When ', () => {
    test('Then it should.. if there are not errors ', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());

      await controller.getAll(req, resp, next);
      expect(repo.query).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
