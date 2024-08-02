import sql from "better-sqlite3";

const db = sql("data.db");

export const getTrainings = () => {
  const query = db.prepare("SELECT * FROM trainings");

  return query.all();
};
