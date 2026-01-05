import { isRequestUnauthorized } from "@/libs/middleware/verifyRequestSource";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const unauthorizedResponse = await isRequestUnauthorized(req);
            if (unauthorizedResponse) return unauthorizedResponse;

        // Create a response and clear the _authToken cookie
        const response = NextResponse.json(
            { message: "Logout successful" },
            { status: 200 }
        );

        // Clear the _authToken cookie
        response.cookies.set("_authToken", "", {
            httpOnly: true,
            secure: true,
            path: "/",
            expires: new Date(0), // Expire immediately
        });

        return response;
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
