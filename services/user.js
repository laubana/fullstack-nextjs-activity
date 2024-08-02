import sql from "better-sqlite3";

const db = sql("data.db");

export const addUser = (email, password) => {
  const result = db
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .run(email, password);

  return result.lastInsertRowid;
};

export const getUser = (email) => {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
};
