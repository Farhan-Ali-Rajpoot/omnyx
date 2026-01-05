import { NextResponse } from "next/server";
import { connectDB } from "@/libs/db/connectDB";
import UserModel from "@/models/user.model";
import { isRequestUnauthorized } from "@/libs/middleware/verifyRequestSource";

export async function POST(req: Request) {
    try {
        const unauthorizedResponse = await isRequestUnauthorized(req);
            if (unauthorizedResponse) return unauthorizedResponse;

        // Connect to the database
        await connectDB();

        // Parse the JSON body
        const body = await req.json();

        const { userId } = body;

        // Validate userId
        if (!userId || typeof userId !== "string") {
            return NextResponse.json(
                { error: "Invalid or missing userId" },
                { status: 400 }
            );
        }

        // Attempt to find and delete the user
        const deletedUser = await UserModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            console.warn(`User with ID ${userId} not found.`);
            return NextResponse.json(
                { error: "User does not exist" },
                { status: 404 }
            );
        }

        // Create the response and clear the _authToken cookie
        const response = NextResponse.json(
            { message: "User deleted successfully", userId },
            { status: 200 }
        );

        response.cookies.set("_authToken", "", {
            httpOnly: true,
            secure: true,
            path: "/",
            expires: new Date(0), // Expire immediately
        });

        return response;

    } catch (err) {
        console.error("Error deleting user:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
