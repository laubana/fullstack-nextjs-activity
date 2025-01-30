import mongoose from "mongoose";

import "@models/Session";
import "@models/Training";
import "@models/User";

export default async () => {
  try {
    mongoose.set("strictQuery", false);

    if (process.env.DB_URI) {
      await mongoose.connect(process.env.DB_URI);
    } else {
      console.error("DB not connected.");
    }
  } catch (error) {
    console.error(error);
  }
};
