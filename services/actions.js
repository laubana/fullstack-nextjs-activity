"use server";

import { redirect } from "next/navigation";
import { createAuthSession, invalidateSession } from "./auth";
import { addUser, getUser } from "./user";
import { hashPassword, verifyPassword } from "@helpers/hash";

// TODO
// 219
export const signIn = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const user = getUser(email);

  if (!user) {
    return { status: "error", message: "Sign-in failed." };
  }

  const isVerified = verifyPassword(user.password, password);

  if (!isVerified) {
    return { status: "error", message: "Sign-in failed." };
  }

  await createAuthSession(user.id);
  redirect("/training");
};

export const signOut = async () => {
  await invalidateSession();
  redirect("/");
};

// TODO
// 219
export const signUp = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password || password.trim().length < 6) {
    return { status: "error", message: "Invalid Input." };
  }

  try {
    const userId = addUser(email, hashPassword(password));
    await createAuthSession(userId);
    redirect("/training");
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return { status: "error", message: "Email already exists." };
    }
    throw error;
  }
};
