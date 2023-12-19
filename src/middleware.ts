import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/", "/((?!api|auth|_next/static|images|favicon.ico).*)"],
};
