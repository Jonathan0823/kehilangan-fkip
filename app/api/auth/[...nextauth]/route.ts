import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { prisma } from "@/app/lib/prisma";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (user) {
          const passwordCorrect = await compare(credentials.password, user.password);

          if (passwordCorrect) {
            return { id: user.id, email: user.email, name: user.name }; 
          }
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
