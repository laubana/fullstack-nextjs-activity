"use server";

import { redirect } from "next/navigation";

import { createAuthSession, invalidateAuthSession } from "./auth";
import { addUser, getUser } from "./user";

import { hashPassword, verifyPassword } from "@helpers/hash";

export const signIn = async (_, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const user = await getUser(email);

  if (!user) {
    return { status: "error", message: "Sign-in failed." };
  }

  const isVerified = verifyPassword(user.password, password);

  if (!isVerified) {
    return { status: "error", message: "Sign-in failed." };
  }

  await createAuthSession(user._id);
  redirect("/training");
};

export const signOut = async () => {
  await invalidateAuthSession();
  redirect("/");
};

export const signUp = async (_, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password || password.trim().length < 6) {
    return { status: "error", message: "Invalid Input" };
  }

  const newUser = await addUser(email, hashPassword(password));

  if (!newUser) {
    return { status: "error", message: "Sign-up failed." };
  }

  await createAuthSession(user._id);
  redirect("/training");
};
