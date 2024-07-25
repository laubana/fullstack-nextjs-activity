"use client";

import Link from "next/link";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { signIn, signUp } from "@services/actions";

// TODO
// 219
export default ({ mode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState({ status: "ready", message: null });

  return (
    <form
      id="auth-form"
      action={async (formData) => {
        try {
          const response =
            mode === "signup" ? await signUp(formData) : await signIn(formData);

          if (response) {
            setState(response);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsSubmitting(false);
        }
      }}
      onSubmit={() => setIsSubmitting(true)}
    >
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
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
