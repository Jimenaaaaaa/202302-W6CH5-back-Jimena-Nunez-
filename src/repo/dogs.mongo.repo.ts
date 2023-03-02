import { Dog } from '../entities/dog';
import { HTTPError } from '../errors/errors.js';
import { DogModel } from './dogs.mongo.model.js';
import { Repo } from './repo.interface.js';
import createDebug from 'debug';
const debug = createDebug('W6:repo');

export class DogsMongoRepo implements Repo<Dog> {
  constructor() {
    debug('instantiate');
  }

  async query(): Promise<Dog[]> {
    debug('query');
    const data = await DogModel.find();
    return data;
  }

  async queryId(id: string): Promise<Dog> {
    debug('queryId with id: ' + id);
    const data = await DogModel.findById(id).populate('owner', {
      things: 0,
    });

    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');
    return {} as Dog;
  }

  async search(query: { key: string; value: unknown }) {
    debug('search');
    const data = await DogModel.find({ [query.key]: query.value });
    return data;
  }

  async create(dog: Partial<Dog>): Promise<Dog> {
    debug('create');
    const data = await DogModel.create(dog);
    return data as Dog;
  }

  async update(dog: Dog): Promise<Dog> {
    const data = await DogModel.findByIdAndUpdate(dog.id, dog, {
      new: true,
    });
    if (!data) throw new Error('Id not found');
    return {} as Dog;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async erase(_id: string): Promise<void> {
    const data = await DogModel.findByIdAndDelete();
    if (!data) throw new HTTPError(404, 'Not found', 'Delete not possible');
  }
}
