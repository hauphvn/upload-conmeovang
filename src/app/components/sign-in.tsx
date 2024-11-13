
import {auth, signIn, signOut} from "@/auth"

export default async function SignIn() {
    const session = await auth();
    const user = session?.user;
    return (
        <>
            {!user ? (
                <form
                    action={async () => {
                        "use server"
                        await signIn("google",{redirectTo:"/dashboard"
                        })
                    }}
                >
                    <button type="submit">Signin with Google</button>
                </form>
            ) : (
                <form
                action = {async () => {
                    "use server"
                    await signOut();
                }}
                >
                    <h1>{user.name}</h1>
                    <button type="submit">Signout</button>
                </form>
            )}
        </>
    )
}
