import { redirect } from "next/navigation";

import { validateAuthSession } from "@services/auth";

export default async ({ children }) => {
  const result = await validateAuthSession();

  if (!result.user) {
    return redirect("/");
  }

  return <>{children}</>;
};
