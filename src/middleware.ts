import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      console.log("authorized", req.nextUrl.pathname, token);
      
      if (req.nextUrl.pathname.startsWith("/dashboard") && token === null) {
        return false;
      }
      return true;
    },
  },
  pages: {
    signIn: "/",
  },
});
