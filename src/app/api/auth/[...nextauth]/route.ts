import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import NaverProvider from "next-auth/providers/naver";

const tokenSet = {} as tokenType;
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "이메일", type: "email", placeholder: "jsmith@gmail.com" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await res.json();
        // console.log("user", user);
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),

    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID ?? "",
      clientSecret: process.env.NAVER_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/snslogin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.id,
          username: user.name,
          sns: account.provider,
        }),
      });

      if (res.status === 401) {
        const error = new Error("로그인을 해주세요.");
        throw error;
      }
      const r = await res.json();

      if (r) {
        tokenSet.accessToken = r.accessToken;
        return r;
      } else {
        // Return false to display a default error message
        // return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
        return "/register";
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (tokenSet.accessToken) {
        token.accessToken = tokenSet.accessToken; //<--- token 객체에 다시 담아서
        // token.id = profile.id
      }
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      //session.accessToken = token.accessToken as string;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
