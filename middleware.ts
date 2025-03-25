import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({ req, res });
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   // Auth check
//   if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
//     const redirectUrl = req.nextUrl.clone();
//     redirectUrl.pathname = '/auth/login';
//     return NextResponse.redirect(redirectUrl);
//   }

//   // Redirect authenticated users away from auth pages
//   if (session && (req.nextUrl.pathname.startsWith('/auth'))) {
//     const redirectUrl = req.nextUrl.clone();
//     redirectUrl.pathname = '/dashboard';
//     return NextResponse.redirect(redirectUrl);
//   }

//   return res;
// }

export default function middleware(req: NextRequest) {
  const res = NextResponse.next();
  return res;
}
// export const config = {
//   matcher: ['/dashboard/:path*', '/auth/:path*'],
// };
