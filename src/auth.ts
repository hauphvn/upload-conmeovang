// import type {
//     GetServerSidePropsContext,
//     NextApiRequest,
//     NextApiResponse,
// } from "next"
// import type { NextAuthOptions } from "next-auth"
// import { getServerSession } from "next-auth"
// import GoogleProvider from "next-auth/providers/google";
//
// // You'll need to import and pass this
// // to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
// export const config = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.AUTH_GOOGLE_ID as string,
//             clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
//             authorization: {
//                 params: {
//                     scope: 'https://www.googleapis.com/auth/drive.file email profile'
//                 }
//             }
//         }),
//     ],
//     callbacks: {
//         async jwt({ token, account }:{
//             token: any,
//             account: any
//         }) {
//             if (account) {
//                 token.accessToken = account.access_token
//                 token.refreshToken = account.refresh_token
//                 token.expiresAt = account.expires_at
//             }
//             return token
//         },
//         async session({ session, token }:{
//             session: any,
//             token: any
//         }) {
//             session.accessToken = token.accessToken
//             return session
//         }
//     } // rest of your config
// } satisfies NextAuthOptions
//
// // Use it in server contexts
// export function auth(
//     ...args:
//         | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
//         | [NextApiRequest, NextApiResponse]
//         | []
// ) {
//     return getServerSession(...args, config)
// }
