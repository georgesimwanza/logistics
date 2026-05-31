import { models, model, Schema } from "mongoose";

const TransportForm = new Schema(
  {
    serviceType: { type: String },
    pickup: { type: String, required: true },
    delivery: { type: String, required: true },
    date: { type: String, required: true },
    weight: { type: String, default: "" },
    cargoType: { type: String, required: true },
    units: { type: String, default: "" },
    insurance: { type: String, default: "" },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

const TransportSchema =
  models.TransportForm || model("TransportForm", TransportForm);
export default TransportSchema;
