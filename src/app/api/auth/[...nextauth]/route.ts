import { env } from "@/env";
import NextAuth, { User } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialProvider from "next-auth/providers/credentials";

import { AdminAuth } from "@/services/admin";
import { firestoreAdmin } from "@/config/firebase.admin";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { AuthClient } from "@/services/client";

const handler = NextAuth({
  providers: [
    CredentialProvider({
      name: "email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        domain: { label: "Domain", type: "text" },
      },
      authorize: async (credentials) => {
        const { email, password, domain } = credentials!;
        if (!email || !password) {
          return null;
        }
        const signedInUser = await AuthClient.signInUser(email, password);
        if (!signedInUser) return null;

        const user = await AdminAuth.getUser(signedInUser.user.uid);
        console.log("User: ", user);
        console.log({
          domain,
          userDomain: user.customClaims?.domain,
        });
        
        if (!user || user.customClaims?.domain !== domain) return null;

        const session: User = {
          id: signedInUser.user.uid,
          email: signedInUser.user.email,
          name: signedInUser.user.displayName,
          image: signedInUser.user.photoURL,
        };
        return session;
      },
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

        const fbToken = await AdminAuth.createCustomToken(session.user.id);
        const user = await AdminAuth.getUser(session.user.id);
        session.firebaseToken = fbToken;
        session.authUser = user;
        console.log("Session Callback : ", session);
      }
      return session;
    },
  },
  adapter: FirestoreAdapter(firestoreAdmin) as Adapter,
  pages: {
    signIn: "/",
    signOut: "/",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify-request",
    // newUser: null, // If set, new users will be directed here on first sign in
  },
});

export { handler as GET, handler as POST };
