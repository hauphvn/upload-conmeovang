import GoogleProvider from "next-auth/providers/google"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
            authorization: {
                params: {
                    scope: "https://www.googleapis.com/auth/drive.file email profile"
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account }:{
            token: any,
            account: any
        }) {
            if (account) {
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
                token.expiresAt = account.expires_at
            }
            return token
        },
        async session({ session, token }:{
            session: any,
            token: any
        }) {
            session.accessToken = token.accessToken as string
            return session
        }
    }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
