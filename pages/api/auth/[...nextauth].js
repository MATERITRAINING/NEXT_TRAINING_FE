import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
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

      console.log('credentials', credentials) 
      
      return false


        
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};
export default NextAuth(authOptions);
