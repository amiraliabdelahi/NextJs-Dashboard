import authConfig from "@/auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);
const authRoutes = ["/login"];
const protectedRoutes = [
  "/",
  "/dashboard",
  "/dashboard/products",
  "/dashboard/users",
  "/dashboard/transactions",
];
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  if (!isLoggedIn) {
    if (protectedRoutes.includes(req.nextUrl.pathname)) {
      return Response.redirect(new URL("/login", req.url));
    }
  } else if (authRoutes.includes(req.nextUrl.pathname)) {
    return Response.redirect(new URL("/dashboard", req.url));
  }
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
