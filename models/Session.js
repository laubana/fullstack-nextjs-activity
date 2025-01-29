import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    expires_at: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models["Session"] ||
  mongoose.model("Session", SessionSchema);
