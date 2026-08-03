import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { drizzle } from 'drizzle-orm/d1';
import { schema } from '../db/schema';
import { canSendEmail, resetPasswordEmail, sendEmail } from './email';

type Env = {
  DB: D1Database;
  BETTER_AUTH_SECRET?: string;
  BETTER_AUTH_URL?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
};

/**
 * Better Auth has to be constructed per request, because the D1 binding only
 * exists inside a request context on Workers.
 */
export function createAuth(env: Env, requestUrl: URL) {
  const db = drizzle(env.DB, { schema });

  const socialProviders =
    env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
          },
        }
      : undefined;

  return betterAuth({
    database: drizzleAdapter(db, { provider: 'sqlite', schema }),
    baseURL: env.BETTER_AUTH_URL ?? requestUrl.origin,
    secret: env.BETTER_AUTH_SECRET,
    emailAndPassword: {
      enabled: true,
      // Verification stays off until a mail provider is configured — turning it
      // on without one would lock every new account out on sign-up.
      requireEmailVerification: false,
      minPasswordLength: 10,
      resetPasswordTokenExpiresIn: 60 * 60, // one hour
      // Only registered when there is somewhere for the mail to go. Better Auth
      // rejects reset requests outright if this is absent, which is the correct
      // behaviour — better than accepting the request and sending nothing.
      ...(canSendEmail(env)
        ? {
            sendResetPassword: async ({
              user,
              url,
            }: {
              user: { email: string; name?: string };
              url: string;
            }) => {
              await sendEmail(env, {
                to: user.email,
                ...resetPasswordEmail(url, user.name),
              });
            },
          }
        : {}),
    },
    ...(socialProviders ? { socialProviders } : {}),
    session: {
      expiresIn: 60 * 60 * 24 * 60, // 60 days — this is a course, not a bank
      updateAge: 60 * 60 * 24,
    },
    advanced: {
      cookiePrefix: 'll',
    },
  });
}

export type Auth = ReturnType<typeof createAuth>;
