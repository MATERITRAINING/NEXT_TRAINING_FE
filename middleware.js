import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import useAuthStore from "@/store/useAuthStore";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    

    console.log("middeware", req?.nextauth?.token?.permissions?.role);
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.permissions?.role?.includes("admin") === false
    ) {
      return NextResponse.rewrite(
        new URL(`/notAccess`, req.url)
      );
    }

    
    if (
      req.nextUrl.pathname.startsWith("/member") &&
      req.nextauth.token?.role !== "member"
    ) {
      return NextResponse.redirect(
        new URL(`/${req.nextauth.token.role}`, req.url)
      );
    }

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
