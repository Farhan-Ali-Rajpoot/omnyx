import { NextResponse } from "next/server";
import UserModel from "@/models/user.model";
import { connectDB } from "@/libs/db/connectDB";
import { isRequestUnauthorized } from "@/libs/middleware/verifyRequestSource";

export async function POST(req: Request) {
    try {
        const unauthorizedResponse = await isRequestUnauthorized(req);
            if (unauthorizedResponse) return unauthorizedResponse;


        await connectDB(); // Ensure DB is connected

        const body = await req.json();


        const { id, currentPassword, newPassword } = body;

        if (!id || !currentPassword || !newPassword) {
            console.log("Missing fields");
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const existedUser = await UserModel.findById(id); // assuming MongoDB _id

        if (!existedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isMatch = await existedUser.isPasswordCorrect(currentPassword);

        if (!isMatch) {
            console.log("Wrong Password");
            return NextResponse.json({ error: "Wrong password" }, { status: 403 });
        }

        existedUser.password = newPassword;
        await existedUser.save(); // ✅ Make sure it's awaited

        return NextResponse.json(
            { message: "Password changed successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error changing password:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
