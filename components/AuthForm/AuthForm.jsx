"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { BeatLoader } from "react-spinners";

import { signIn, signUp } from "@services/actions";

export default ({ mode }) => {
  const [state, action] = useFormState(mode === "signup" ? signUp : signIn, {
    status: "ready",
    message: null,
  });
  const status = useFormStatus();

  return (
    <form id="auth-form" action={action}>
      <div>
        <img src="/images/logo.png" alt="lock" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {state.status === "error" && <p id="form-errors">{state.message}</p>}
      <p>
        <button type="submit" disabled={status.pending}>
          {status.pending ? (
            <BeatLoader color="#D0CFD6" />
          ) : mode === "signup" ? (
            "Sign Up"
          ) : (
            "Sign In"
          )}
        </button>
      </p>
      <p>
        {mode === "signup" ? (
          <Link href="/">Login with existing account.</Link>
        ) : (
          <Link href="/?mode=signup">Create an account.</Link>
        )}
      </p>
    </form>
  );
};
