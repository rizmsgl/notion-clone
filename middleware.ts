import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/preview/:path*" ]);

export default clerkMiddleware((auth, request) => {
    if(!isPublicRoute(request)) {
      auth().protect();
    }
  });


export const config = {
    matcher: [
        '/((?!.+\\.[\\w]+$|_next).*)', 
        '/', 
        '/(api|trpc)(.*)',
    ],
};
