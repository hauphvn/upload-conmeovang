declare module "next-auth" {
    interface Session {
        accessToken?: string
        user: {
            email: string
            name: string
            image?: string
        }
    }
}
