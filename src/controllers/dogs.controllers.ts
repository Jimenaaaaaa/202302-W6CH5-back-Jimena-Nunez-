import { Response, Request } from 'express';
import { DogsFileRepo } from '../repo/dogs.file.repo.js';

export class DogsController {
  constructor(public repo: DogsFileRepo) {}

  getAll(_req: Request, resp: Response) {
    this.repo.read().then((data) => {
      resp.json(data);
    });
  }

  get(req: Request, resp: Response) {
    const { id } = req.params;
    this.repo
      .readId(Number(id))
      .then((data) => {
        resp.json(data);
      })
      .catch((error) => {
        resp.status(500).send(error.message);
      });
  }

  post(req: Request, resp: Response) {
    const newDog = req.body;
    this.repo
      .write(newDog)
      .then(() => {
        resp.json('New pet added!');
      })
      .catch((error) => {
        resp.status(500).send(error.message);
      });
  }

  patch(req: Request, resp: Response) {
    const newData = req.body;
    this.repo
      .update(newData)
      .then(() => {
        resp.json('Pet succesfully updated!');
      })
      .catch((error) => {
        resp.status(500).send(error.message);
      });
  }

  delete(req: Request, resp: Response) {
    this.repo
      .delete(Number(req.params.id))
      .then(() => {
        resp.json('Pet succesfully deleted.');
      })
      .catch((error) => {
        resp.status(500).send(error.message);
      });
  }
}
