import mongoose from "mongoose";

import "@models/Session";
import "@models/Training";
import "@models/User";

export default async () => {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.error(error);

    console.error("Failed to connect to DB 🚨");
  }
};
