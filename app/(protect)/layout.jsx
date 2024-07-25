import { redirect } from "next/navigation";
import { verifyAuthCookie } from "@services/auth";

export default async ({ children }) => {
  const result = await verifyAuthCookie();

  if (!result.user) {
    return redirect("/");
  }

  return <>{children}</>;
};
