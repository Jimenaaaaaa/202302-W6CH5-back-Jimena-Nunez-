/* eslint-disable new-cap */
import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { UsersMongoRepo } from '../repo/user.mongo.repo.js';

export const usersRouter = Router();
const repo = new UsersMongoRepo();
const controller = new UserController(repo);

usersRouter.post('/register', controller.register.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
