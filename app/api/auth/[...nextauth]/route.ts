import { appEnv } from "@/lib/env";
import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

const handler = NextAuth({
  providers: [
    FacebookProvider({
      clientId: appEnv.infrastructure.facebook.clientId,
      clientSecret: appEnv.infrastructure.facebook.clientSecret,
    }),
  ],
});

export { handler as GET, handler as POST };
