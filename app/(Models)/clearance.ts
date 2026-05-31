import { Schema, model, models } from "mongoose";

const ClearanceFormSchema = new Schema(
  {
    CargoType: {
      type: String,
      required: [true, "Cargo type is required"],
      enum: [
        "Motor vehicle",
        "Commercial goods",
        "Personal effects",
        "Machinery & equipment",
      ],
    },
    Country: {
      type: String,
      required: [true, "Country of origin is required"],
      trim: true,
    },
    EntryPoint: {
      type: String,
      required: [true, "Entry point is required"],
      trim: true,
    },
    Value: {
      type: String,
      required: [true, "Estimated value is required"],
      trim: true,
    },
    FullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    Phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    ADN: {
      type: String,
      default: "",
      trim: true,
    },
    // Vehicle-specific fields (only relevant when CargoType === "Motor vehicle")
    Make: {
      type: String,
      default: "",
      trim: true,
    },
    Model: {
      type: String,
      default: "",
      trim: true,
    },
    Year: {
      type: String,
      default: "",
      trim: true,
    },
    // Track case status
    Status: {
      type: String,
      enum: ["Submitted", "Agent assigned", "At customs", "Released"],
      default: "Submitted",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  },
);

const ClearanceSchema =
  models.ClearanceForm || model("ClearanceForm", ClearanceFormSchema);

export default ClearanceSchema;
