import { emailSchema } from "@/schema/credentials-schema";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const emailValidation = emailSchema.parse(credentials.email);

        if (!emailValidation) {
          throw new Error("Invalid email");
        }
      },
    }),
  ],
  callbacks: {
    signIn: ({ account, profile }) => {
      // console.log(account);

      try {
        return true;
      } catch (error) {
        console.log(error);

        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
