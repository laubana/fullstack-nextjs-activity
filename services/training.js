import db from "@helpers/db";

export const getTrainings = () => {
  const query = db.prepare("SELECT * FROM trainings");

  return query.all();
};
