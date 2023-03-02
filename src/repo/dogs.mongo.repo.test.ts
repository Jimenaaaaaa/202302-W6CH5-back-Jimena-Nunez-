import { DogModel } from './dogs.mongo.model';
import { DogsMongoRepo } from './dogs.mongo.repo';

describe('When i use query', () => {
  const repo = new DogsMongoRepo();

  test('Then should return the datas', async () => {
    const mockData = [{ chars: 'test' }];
    (DogModel.find as jest.Mock).mockImplementation(() => ({
      populate: jest.fn().mockReturnValue(mockData),
    }));

    const result = await repo.query();

    expect(DogModel.find).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });
});
