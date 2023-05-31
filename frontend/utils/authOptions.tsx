import CredentialsProvider from "next-auth/providers/credentials"
import {users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import db from "@/db/db";
import { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
              username: { label: "E-mail", type: "text"},
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    if (!credentials) return null;
                    console.log(credentials);
                    let result = await db.select().from(users).where(eq(users.email, credentials.username));
                    console.log(result);
                    if (result.length === 0) return null;
                    let authResult = await bcrypt.compare(credentials.password, result[0].password);
                    if  (authResult) {
                        return {id: result[0].id, name: result[0].name, email: result[0].email} as any; // workaround
                    }
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

export default authOptions;