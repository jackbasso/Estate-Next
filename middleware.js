import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  //ROUTES THAT CAN BE ACCESSED WITHOUT SIGN IN
  publicRoutes: ["/"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
