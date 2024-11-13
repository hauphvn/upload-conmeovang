import {DefaultSession} from "next-auth"

declare module "next-auth" {
    interface Session {
        accessToken?: string
        user: {
            /** Extends the default user type */
            id?: string
            email: string
            name?: string
            image?: string
        } & DefaultSession["user"]
    }

    interface Account {
        access_token?: string
        refresh_token?: string
        expires_at?: number
        providerAccountId: string
        type: string
        provider: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string
        refreshToken?: string
        expiresAt?: number
    }
}
