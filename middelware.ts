import { auth as middleware } from "@/features/auth";

export default middleware;

export const config = {
  matcher: ["/jobs/:path*", "/profile/:path*"],
};
