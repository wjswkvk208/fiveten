import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/board/:path*"],
};
