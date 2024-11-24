import { UserInfoProps } from "@/next-auth";
import { loginUser } from "@/services/auth-services";
import { userStore } from "@/store";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthConfig: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 0.5 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 0.5 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as Record<string, string>;

        // Normal sign in flow
        // console.log("Before req");
        const res = await loginUser({ email, password });

        // console.log("res", res);

        if (res?.status !== 200) {
          throw new Error(
            JSON.stringify({
              data: (res as unknown as AxiosError)?.response.data,
              message: (res as unknown as AxiosError<{ message: string }>)
                ?.response?.data?.message,
            })
          );
        }

        const user = res.data.data.user;

        // console.log(user);
        return { id: user._id, ...user, jwt: res.data.data.jwt };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        token = { ...token, ...session };
      }

      if (user) {
        token = user as UserInfoProps;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token;
      session.expires = dayjs().add(12, "hours").toISOString();

      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};

const handler = NextAuth(nextAuthConfig);

// export const { handlers, signIn, signOut, auth } = handler;

export { handler as GET, handler as POST };
