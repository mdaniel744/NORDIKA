import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  if (request.method === "GET" && request.nextUrl.search) response.headers.set("X-Robots-Tag", "noindex, follow");
  return response;
}

export const config = { matcher: ["/((?!api|_next/static|_next/image|icon.svg|og.png|sitemap.xml|robots.txt).*)"] };
