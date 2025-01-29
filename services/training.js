import connect from "../configs/db";
import Training from "../models/Training";

export const getTrainings = async () => {
  await connect();

  const existingTrainings = await Training.find();

  return existingTrainings;
};
