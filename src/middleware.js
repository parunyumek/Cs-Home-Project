import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  try {
    let cookie = request.cookies.get("user")?.value;

    const user = JSON.parse(cookie);

    console.log("user :>> ", user);

    if (!cookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      if (user.role === "admin") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } catch (error) {
    console.log("error :>> ", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  // จะเข้า middleware เมื่อมี path ตามข้างล่างนี้
  matcher: "/admin-page/:path*",
};
