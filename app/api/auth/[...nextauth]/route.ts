import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {},
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const response = await sql`
                    SELECT * FROM users WHERE email = ${credentials?.email}`;

        const user = response.rows[0];

        const passwordCorrect = await compare(
          credentials?.password || " ",
          user.password
        );

        if (user && passwordCorrect) {
          return { id: user.id, email: user.email, username: user.username };
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
