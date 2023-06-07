import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import authService from "@/service/authService";

export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        return {
          ...credentials,
        };
      },
    }),

    // ...add more providers here
    {},
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl + "/auth/login";
    },

    async signIn({ account, user }) {
      if (account?.provider === "google") {
        try {
          await authgoogleLogin({ email: user.email });

          return true;
        } catch {
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, account, trigger, session }) {
      if (account?.provider === "google") {
        const res = await authService.googleLogin({ email: token.email });

        return {
          ...token,
          name: res.data.user.name,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          role: res.data.user.role,
          id: res.data.user.id,
        };
      }

      if (trigger === "update") {
        return { ...token, ...session.user };
      }

console.log('ser', user)

      return {
        ...token,
       ...user
      };
    },
    async session({ session, user, token }) {
      session.user = { ...token };

      console.log('ses', session)
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};
export default NextAuth(authOptions);
