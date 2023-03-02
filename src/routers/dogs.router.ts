/* eslint-disable new-cap */
import { Router } from 'express';
import { DogsController } from '../controllers/dogs.controllers.js';
import { DogsMongoRepo } from '../repo/dogs.mongo.repo.js';
import { UsersMongoRepo } from '../repo/user.mongo.repo.js';

export const dogsRouter = Router();

const repo = new DogsMongoRepo();
const userRepo = new UsersMongoRepo()

const controller = new DogsController(repo, userRepo);

dogsRouter.get('/', controller.getAll.bind(controller));
dogsRouter.get('/:id', controller.get.bind(controller));
dogsRouter.post('/', controller.post.bind(controller));
dogsRouter.patch('/', controller.patch.bind(controller));
dogsRouter.delete('/:id', controller.delete.bind(controller));
