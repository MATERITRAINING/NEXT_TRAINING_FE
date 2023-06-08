import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    

    
    return NextResponse.next();
  },
  {
    authorized({ req, token }) {
      if (token) return true;
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

export const config = {
  matcher: ["/admin", "/admin/:path*", "/member", "/member/:path*"],
};