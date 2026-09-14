import { cookies } from "next/headers";

export async function POST() {
    try {
        const cookieStore = await cookies();

        cookieStore.set("auth_token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "lax",
            expires: new Date(0),
            path: "/"
        });

        return Response.json(
            {
                success: true,
                message: "Logout successful."
            }
        );
    } catch (error) {
        console.error("Logout error: ", error);

        return Response.json(
            {
                success: false,
                message: "Something went wrong while logging out.",
            },
            {status: 500}
        )
    }
}