import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (credentials.username === 'tester' && credentials.password === 'Konkurs123')
                    return {id: 1, name: 'Tester'}
                return null;
            }
        })
    ]
};
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
