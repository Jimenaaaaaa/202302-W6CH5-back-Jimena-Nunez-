import { model, Schema } from 'mongoose';
import { DogStructure } from '../entities/dog.model.copy';

const dogSchema = new Schema<DogStructure>({
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
});

export const DogModel = model('Dog', dogSchema, 'dogs');
