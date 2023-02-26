export type DogStructure = {
  id: number;
  name: string;
  breed: string;
  weight: number;
  is_good: boolean;
};

export interface DogsRepoStructure {
  read(): Promise<DogStructure[]>;
  readId(id: number): Promise<DogStructure>;
  write(dog: DogStructure): Promise<void>;
  update(dog: DogStructure): Promise<void>;
  delete(dog: DogStructure['id']): Promise<void>;
}
