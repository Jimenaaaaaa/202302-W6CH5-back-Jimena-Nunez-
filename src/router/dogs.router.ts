/* eslint-disable new-cap */
import { Router } from 'express';
import { DogsController } from '../controllers/dogs.controllers.js';
import { DogsFileRepo } from '../repo/dogs.file.repo.js';

export const dogsRouter = Router();

const repo = new DogsFileRepo();
const controller = new DogsController(repo);

dogsRouter.get('/', controller.getAll.bind(controller));
dogsRouter.get('/:id', controller.get.bind(controller));
dogsRouter.post('/', controller.post.bind(controller));
dogsRouter.patch('/', controller.patch.bind(controller));
dogsRouter.delete('/:id', controller.delete.bind(controller));
