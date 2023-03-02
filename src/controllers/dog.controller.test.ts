import { DogsController } from './dogs.controllers';
import { Request, Response, NextFunction } from 'express';
import { UsersMongoRepo } from '../repo/user.mongo.repo';
import { DogsMongoRepo } from '../repo/dogs.mongo.repo';

describe('Given DogsController ', () => {
  const repo: DogsMongoRepo = {
    create: jest.fn(),
    query: jest.fn(),
    queryId: jest.fn(),
    search: jest.fn(),
    update: jest.fn(),
    erase: jest.fn(),
  };

  const repoUsers = {
    create: jest.fn(),
    query: jest.fn(),
    queryId: jest.fn(),
    search: jest.fn(),
    update: jest.fn(),
    erase: jest.fn(),
  } as UsersMongoRepo;

  const resp = {
    json: jest.fn(),
  } as unknown as Response;

  const next = jest.fn() as NextFunction;

  const controller = new DogsController(repo, repoUsers);

  describe('Given we use the "getAll" method', () => {
    const req = {
      body: {},
      params: { id: '' },
      info: {},
    } as unknown as Request;

    describe('When there is no errors', () => {
      test('Then repo.query and resp.json should have been called.', async () => {
        await controller.getAll(req, resp, next);
        expect(repo.query).toHaveBeenCalled();
        expect(resp.json).toHaveBeenCalled();
      });
    });

    describe('When there are errors', () => {
      test('Then repo.query and next should be called. ', async () => {
        (repo.query as jest.Mock).mockRejectedValue(new Error());
        await controller.getAll(req, resp, next);
        expect(repo.query).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('Given we use the "get" method', () => {
    const req = {
      body: {},
      params: { id: '' },
      info: {},
    } as unknown as Request;

    describe('When there is no errors', () => {
      test('Then repo.query and resp.json should have been called.', async () => {
        await controller.get(req, resp, next);

        expect(repo.queryId).toHaveBeenCalled();
        expect(resp.json).toHaveBeenCalled();
      });
    });

    describe('When there are errors', () => {
      test('Then repo.query and next should be called. ', async () => {
        (repo.queryId as jest.Mock).mockRejectedValue(new Error());
        await controller.get(req, resp, next);
        expect(repo.queryId).toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('Given we use the "post" method', () => {
    describe('When userId has no value', () => {
      const req = {
        body: {},
        params: { id: '' },
        info: {},
      } as unknown as Request;

      test('Then next should have been called.', async () => {
        await controller.post(req, resp, next);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('When userId has value', () => {
      const req = {
        body: {},
        params: { id: '' },
        info: {
          id: 123,
        },
      } as unknown as Request;
      test('Then repoUSers.queryId, repo.create, repoUsers.update and resp.json should be called. ', async () => {
        await controller.post(req, resp, next);
        expect(repoUsers.queryId).toHaveBeenCalled();
        expect(repo.create).toHaveBeenCalled();
        // expect(repoUsers.update).toHaveBeenCalled();
        expect(resp.json).toHaveBeenCalled();
      });
    });
  });

  describe('Given we use the "patch" method', () => {
    const req = {
      body: {},
      params: { id: '' },
      info: {},
    } as unknown as Request;

    describe('When it passes with no errors', () => {
      test('Then repo.update() and resp.json() should have been called.', async () => {
        await controller.patch(req, resp, next);
        expect(repo.update).toHaveBeenCalled();
        expect(resp.json).toHaveBeenCalled();
      });
    });

    describe('When there are errors', () => {
      test('Then repo.query and next should be called. ', async () => {
        (repo.update as jest.Mock).mockRejectedValue(new Error());
        await controller.patch(req, resp, next);
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('Given we use the "delete" method', () => {
    const req = {
      body: {},
      params: { id: '' },
      info: {},
    } as unknown as Request;

    describe('When it passes with no errors', () => {
      test('Then repo.erase() and resp.json() should have been called.', async () => {
        await controller.delete(req, resp, next);
        expect(repo.erase).toHaveBeenCalled();
        expect(resp.json).toHaveBeenCalled();
      });
    });

    describe('When there are errors', () => {
      test('Then repo.query and next should be called. ', async () => {
        (repo.erase as jest.Mock).mockRejectedValue(new Error());
        await controller.delete(req, resp, next);
        expect(next).toHaveBeenCalled();
      });
    });
  });
});
