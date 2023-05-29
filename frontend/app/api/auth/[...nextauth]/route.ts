import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {users } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import db from "@/db/db";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
              username: { label: "E-mail", type: "text"},
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    if (!credentials) return null;
                    
                    let result = await db.select().from(users).where(eq(users.email, credentials.username));
                    if (result.length === 0) return null;
                    console.log("user found", result[0]);
                    let authResult = await bcrypt.compare(credentials.password, result[0].password);
                    console.log(authResult);
                    if  (authResult) {
                        return {id: result[0].id, name: result[0].name, email: result[0].email} as any; // workaround
                    }
                    console.log("password incorrect");
                    return null;
                } catch (e) {
                    console.log(e);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin'
    }
};
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
