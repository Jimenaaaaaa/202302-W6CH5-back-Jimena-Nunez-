import { DogStructure } from '../entities/dog.model.copy';
import { HTTPError } from '../errors/errors.js';
import { DogModel } from './dogs.mongo.model.js';
import { Repo } from './repo.interface.js';
import createDebug from 'debug';
const debug = createDebug('W6:repo');

export class DogsMongoRepo implements Repo<DogStructure> {
  constructor() {
    debug('instantiate');
  }

  async query(): Promise<DogStructure[]> {
    debug('query');
    const data = await DogModel.find();
    return data;
  }

  async queryId(id: string): Promise<DogStructure> {
    debug('queryId with id: ' + id);
    const data = await DogModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');
    return {} as DogStructure;
  }

  async search(query: { key: string; value: unknown }) {
    debug('search');
    const data = await DogModel.find({ [query.key]: query.value });
    return data;
  }

  async create(dog: Partial<DogStructure>): Promise<DogStructure> {
    debug('create');
    const data = await DogModel.create(dog);
    return data as DogStructure;
  }

  async update(dog: DogStructure): Promise<DogStructure> {
    const data = await DogModel.findByIdAndUpdate(dog.id, dog, {
      new: true,
    });
    if (!data) throw new Error('Id not found');
    return {} as DogStructure;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async erase(_id: string): Promise<void> {
    const data = await DogModel.findByIdAndDelete();
    if (!data) throw new HTTPError(404, 'Not found', 'Delete not possible');
  }
}
