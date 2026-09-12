import NextAuth from "next-auth";
import Facebook from "next-auth/providers/facebook";
import { appEnv } from "./lib/env";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Facebook({
      clientId: appEnv.infrastructure.facebook.clientId!,
      clientSecret: appEnv.infrastructure.facebook.clientSecret!,
    }),
  ],
});
