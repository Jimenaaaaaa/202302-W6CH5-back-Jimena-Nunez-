import { User } from "./user";

export type Dog = {
  id: string;
  name: string;
  breed: string;
  weight: number;
  is_good: boolean;
  owner: User
};
