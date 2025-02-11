import dbConfig from "@configs/dbConfig";
import User from "@models/User";

export const addUser = async (email, password) => {
  await dbConfig.connect();

  const existingUser = await User.findOne({ email }).lean();

  if (existingUser) {
    return null;
  }

  const newUser = await User.create({ email, password });

  return newUser;
};

export const getUser = async (email) => {
  await dbConfig.connect();

  const existingUser = await User.findOne({ email }).lean();

  return existingUser;
};
