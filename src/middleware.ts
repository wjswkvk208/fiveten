// import { NextRequest, NextResponse } from "next/server";
// import { CreateGame } from "./hooks/Game";

// export async function middleware(req: NextRequest) {
//   console.log(req);
//   const response = NextResponse.next();

//   return response;
// }

// function loadUser() {
//   try {
//     const user = localStorage.getItem("user");
//   } catch (error) {}
// }
export { default } from "next-auth/middleware";

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log(req.nextauth.token);
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token?.role === "admin",
//     },
//   }
// );

export const config = {
  matcher: ["/board/:path*"],
  // callbacks: {
  //   authorized({ req, token }) {
  //     console.log("token", token);
  //     if (token) return true; // If there is a token, the user is authenticated
  //   },
  // },
};
