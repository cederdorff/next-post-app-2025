import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { getUserByEmail, createUser } from "@/lib/firebase-users";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if user exists in Firebase
      console.log(user);

      const existingUser = await getUserByEmail(user.email);
      if (!existingUser) {
        // Create new user in Firebase
        const firebaseUserId = await createUser({
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image
        });
        console.log("New user created in Firebase:", firebaseUserId);
      }

      return true; // Allow sign in
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  },
  pages: {
    signIn: "/signin"
  }
});
