import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Lucia } from "lucia";
import mongoose from "mongoose";

const adapter = new MongodbAdapter(
  mongoose.connection.collection("sessions"),
  mongoose.connection.collection("users")
);

const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: { secure: process.env.NODE_ENV === "production" },
    expires: false,
  },
});

export default { lucia };
