import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET, // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",

      credentials: {},
      async authorize(credentials, req) {
       

        return {
          ...credentials,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {

     
      session.user = {
        ...token,
        users: JSON.parse(token.users),
        permissions: JSON.parse(token.permissions),
      };

      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
       
        console.log('ses', session.user.permissions)
        return {
          ...token,
          user: session.user,
          accessToken: session.user.accessToken,
          refreshToken: session.user.refreshToken,
          permissions : JSON.stringify(session.user.permissions),
        };
      }
      return {
        ...token,
        ...user,
      };
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};
export default NextAuth(authOptions);
