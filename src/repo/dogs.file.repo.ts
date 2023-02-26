import fs from 'fs/promises';
import { DogStructure, DogsRepoStructure } from '../models/models';

const file = './data/data.json';

export class DogsFileRepo implements DogsRepoStructure {
  read(): Promise<DogStructure[]> {
    return fs
      .readFile(file, { encoding: 'utf-8' })
      .then((data) => JSON.parse(data) as any[]);
  }

  readId(id: number): Promise<DogStructure> {
    return this.read().then((data) => {
      const dog: DogStructure = data.find((dog) => dog.id === id);
      if (!dog) {
        throw new Error('Sorry! we have not dogs with Id -> ' + id);
      }

      return dog;
    });
  }

  write(dog: Partial<DogStructure>) {
    return fs.readFile(file, { encoding: 'utf-8' }).then((data) => {
      const parsed = JSON.parse(data) as any[];
      if (!dog.id) {
        const prueba = parsed[parsed.length - 1].id + 1;
        dog.id = prueba;
      }

      const newDogs = [...parsed, dog];
      if (!newDogs) {
        throw new Error('No se pudo sumar tu perrito a la lista de perritos');
      }

      const newDog = JSON.stringify(newDogs);
      return fs.writeFile(file, newDog, { encoding: 'utf-8' });
    });
  }

  update(newData: Partial<DogStructure>) {
    return fs.readFile(file, { encoding: 'utf-8' }).then((data) => {
      const parsed = JSON.parse(data) as any[];
      if (!newData.id) {
        throw new Error('You did not provide an id');
      }

      const index = parsed.findIndex((dog) => dog.id === newData.id);

      if (index === -1) {
        throw new Error(`Sorry, there are no dogs with id -> ${newData.id}`);
      }

      parsed[index] = newData;
      const updatedDogs = JSON.stringify(parsed);
      return fs.writeFile(file, updatedDogs, { encoding: 'utf-8' });
    });
  }

  delete(id: number) {
    return fs.readFile(file, { encoding: 'utf-8' }).then((data) => {
      const parsed = JSON.parse(data) as any[];
      if (!id) {
        throw new Error('You did not provide an id');
      }

      const finalDogs = JSON.stringify(parsed.filter((dog) => dog.id !== id));
      console.log(finalDogs);
      return fs.writeFile(file, finalDogs, 'utf-8');
    });
  }
}
