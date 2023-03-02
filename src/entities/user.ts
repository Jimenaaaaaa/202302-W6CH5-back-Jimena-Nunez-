import { Dog } from './dog';

export type User = {
  id: string;
  email: string;
  password: string;
  dogs: Dog[];
};
