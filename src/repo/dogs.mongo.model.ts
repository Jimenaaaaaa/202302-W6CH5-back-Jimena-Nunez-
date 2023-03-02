import { model, Schema, SchemaTypes } from 'mongoose';
import { Dog } from '../entities/dog';

const dogSchema = new Schema<Dog>({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  breed: {},

  weight: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },

  is_good: {},

  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
  },
});

dogSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

export const DogModel = model('Dog', dogSchema, 'dogs');
