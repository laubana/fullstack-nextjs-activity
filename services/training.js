import dbConfig from "@configs/dbConfig";
import Training from "@models/Training";

export const getTrainings = async () => {
  await dbConfig.connect();

  const existingTrainings = await Training.find().lean();

  return existingTrainings;
};
