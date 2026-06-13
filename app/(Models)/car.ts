import { Schema, models, model } from "mongoose";
import { randomUUID } from "node:crypto";

const CarSchema = new Schema({
  _id: {
    type: String,
    default: () => randomUUID(),
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  mileage: {
    type: String,
    required: true,
  },
  acceleration: {
    type: String,
    required: true,
  },
  mpg: {
    type: String,
    required: true,
  },
  fuel: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    required: true,
    default: [],
  },

  badge: {
    type: String,
    required: true,
  },
});
const Car = models.CarShema || model("Car", CarSchema);
export default Car;
