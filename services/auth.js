import { cookies } from "next/headers";

import luciaConfig from "@configs/luciaConfig";

export const createAuthSession = async (userId) => {
  const session = await luciaConfig.lucia.createSession(userId, {});
  const sessionCookie = luciaConfig.lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};

export const invalidateAuthSession = async () => {
  const { session } = await validateAuthSession();

  if (!session) {
    return;
  }

  await luciaConfig.lucia.invalidateSession(session.id);

  const sessionCookie = luciaConfig.lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};

export const validateAuthSession = async () => {
  const sessionId = cookies().get(luciaConfig.lucia.sessionCookieName)?.value;

  if (!sessionId) {
    return { user: null, session: null };
  }

  const result = await luciaConfig.lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = luciaConfig.lucia.createSessionCookie(
        result.session.id
      );

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    if (!result.session) {
      const sessionCookie = luciaConfig.lucia.createBlankSessionCookie();

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {
    console.error(error);
  }

  return result;
};
