import { HTTPError } from '../errors/errors.js';
import { Repo } from './repo.interface.js';
import createDebug from 'debug';
import { User } from '../entities/user';
import { UserModel } from './user.mongo.model.js';
const debug = createDebug('W6:repo');

export class UsersMongoRepo implements Repo<User> {
  constructor() {
    debug('instantiate');
  }

  async query(): Promise<User[]> {
    debug('query');
    return [];
  }

  async queryId(id: string): Promise<User> {
    debug('queryId with id: ' + id);
    const data = await UserModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'Id not found in queryId');
    return {} as User;
  }

  async search(query: { key: string; value: unknown }) {
    debug('search');
    const data = await UserModel.find({ [query.key]: query.value });
    return data;
  }

  async create(user: Partial<User>): Promise<User> {
    debug('create');
    const data = await UserModel.create(user);
    return data as User;
  }

  async update(user: User): Promise<User> {
    const data = await UserModel.findByIdAndUpdate(user.id, user, {
      new: true,
    });
    if (!data) throw new Error('Id not found');
    return {} as User;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async erase(_id: string): Promise<void> {
    const data = await UserModel.findByIdAndDelete();
    if (!data) throw new HTTPError(404, 'Not found', 'Delete not possible');
  }
}

