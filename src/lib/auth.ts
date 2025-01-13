import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { neon } from "@neondatabase/serverless";
import { compare } from "bcrypt";

const sql = neon(`${process.env.DATABASE_URL}`);

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const response = await sql(
          "SELECT * FROM USERS WHERE username = ($1)",
          [credentials?.username],
        );

        const user = response[0];

        if (!user) {
          throw new Error("User does not exist!");
        }

        const correctPassword = await compare(
          credentials?.password || "",
          user.password,
        );

        if (!correctPassword) {
          throw new Error("Incorrect password.");
        }

        return {
          id: user.id as number,
          username: user.username as string,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as number;
        token.username = user.username as string;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        username: token.username,
      };

      return session;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
