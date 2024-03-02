import { env } from "@/env";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import adminAuthService from "@/services/admin";
import { firestoreAdmin } from "@/config/firebase.admin";
import { FirestoreAdapter } from "@auth/firebase-adapter";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.sub = user.id;

        console.log("JWT Callback user", user);
        console.log("JWT Callback token", token);
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub as string;

        console.log("Session Callback user", session.user);
        const fbToken = await adminAuthService.createCustomToken(
          session.user.id
        );
        session.firebaseToken = fbToken;
      }
      return session;
    },
  },
  adapter: FirestoreAdapter(firestoreAdmin) as Adapter,
  pages: {
    // signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify-request",
    // newUser: null, // If set, new users will be directed here on first sign in
  },
});

export { handler as GET, handler as POST };
