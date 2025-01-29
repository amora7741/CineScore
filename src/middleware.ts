import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    const pathName = req.nextUrl.pathname;

    const isAuth = await getToken({ req });

    const sensitiveRoutes = ["/profile"];

    const authRoutes = ["/login", "/signup"];

    const isAccessingAuthRoute = authRoutes.some((route) =>
      pathName.startsWith(route),
    );

    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathName.startsWith(route),
    );

    if (isAccessingAuthRoute) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next();
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/", "/login", "/profile", "/signup"],
};
