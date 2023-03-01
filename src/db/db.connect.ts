import mongoose from 'mongoose';
import { config } from '../config.js';
const { cluster, user, password, dbName } = config;

export const dbConnect = () => {
  const uri = `mongodb+srv://${user}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;
  console.log(uri);
  return mongoose.connect(uri);
};
