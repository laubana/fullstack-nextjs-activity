import mongoose from "mongoose";

const TrainingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models["Training"] ||
  mongoose.model("Training", TrainingSchema);
