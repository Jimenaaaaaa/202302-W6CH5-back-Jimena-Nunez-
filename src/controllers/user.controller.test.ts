import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user';
import { Auth } from '../helpers/auth';
import { Repo } from '../repo/repo.interface';
import { UserController } from './user.controller';

jest.mock('../helpers/auth.js');

describe('Given the register method from UserController class', () => {
  const mockRepo = {
    create: jest.fn(),
    search: jest.fn(),
  } as unknown as Repo<User>;

  const controller = new UserController(mockRepo);

  describe('When there is not a password in the body', () => {
    const req = {
      body: {
        email: 'test',
      },
    } as Request;

    const resp = {
      status: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    test('Then Next should have been called', async () => {
      await controller.register(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When there is not a email in the body', () => {
    const req = {
      body: {
        password: 'test',
      },
    } as Request;

    const resp = {
      status: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    test('Then Next should have been called', async () => {
      await controller.register(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When all is OK', () => {
    const req = {
      body: {
        email: 'prueba',
        password: 'prueba',
      },
    } as Request;

    const resp = {
      status: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn() as NextFunction;

    test('Then json should have been called', async () => {
      await controller.register(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
  });
});

describe('Given the login method from UserController class', () => {
  const mockRepo = {
    create: jest.fn(),
    search: jest.fn(),
  } as unknown as Repo<User>;

  const controller = new UserController(mockRepo);

  const req = {
    body: {
      email: 'test',
      password: 'test',
    },
  } as Request;

  const resp = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  const next = jest.fn() as NextFunction;
  Auth.compare = jest.fn().mockResolvedValue(true);

  describe('The password and the email are valid', () => {
    (mockRepo.search as jest.Mock).mockResolvedValue(['test']);

    test('expect jsonn to have been called', async () => {
      await controller.login(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
  });

  describe('If the user gives no password', () => {
    const req2 = {
      body: {
        email: 'test',
      },
    } as Request;

    test('expect next to have been called ', async () => {
      await controller.login(req2, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
