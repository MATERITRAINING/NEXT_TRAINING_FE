import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    if (
      req?.nextUrl?.pathname?.startsWith("/admin") &&
      req?.nextauth?.token?.permissions?.role?.includes("admin")
    ) {
      return NextResponse.rewrite(new URL("/notAccess", req.url));
    }

    if (req?.nextauth?.token?.permissions === "null") {
      return NextResponse.rewrite(new URL("/notAccess", req.url));
    }

    return NextResponse.next();
  },
  {
    authorized({ token }) {
      if (token) return true;
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

export const config = { matcher: ["/admin", "/admin/:path*"] };
