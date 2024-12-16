
import { NextAuthOptions, User } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db"

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials"
import { getUserFromDb } from "@/app/actions/user.actions";
import { addUserFromDb } from "@/app/actions/addUser";

const adapter = DrizzleAdapter(db)

export const authOptions: NextAuthOptions = {
  adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Credentials are required.");
        }
        let user = null
        user = await getUserFromDb(
          credentials.email as string
          , credentials.password as string) 
        if (!user) {
          throw new Error("Invalid credentials.")
        }

        if (!user.success) {
          throw new Error(user.message)
        }
 
        // return user object with their profile data
        if (user && user.success) {
          // Si l'utilisateur existe déjà, retourne ses données
          return user.data as User;
        }
        const newUser = await addUserFromDb(
          credentials.email as string,
          credentials.password as string
        );

        if (!newUser.success) {
          // Erreur lors de l'ajout de l'utilisateur
          throw new Error(newUser.message || "User registration failed.");
        }

        // Retourne les données du nouvel utilisateur
        return newUser.data as User;

      },
    }),
  ], 
  secret: process.env.AUTH_SECRET,
  session :{
    strategy:"jwt",
    
  }
};