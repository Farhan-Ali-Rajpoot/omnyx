import { NextResponse } from "next/server";
import { connectDB } from "@/libs/db/connectDB";
import AdminModel from "@/models/admin.model";

export async function POST(req: any) {
  try {

    await connectDB();

    const { id, currentPassword, newPassword } = await req.json();

    if (!id || !currentPassword || !newPassword) {
      console.log("Missing fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existedAdmin = await AdminModel.findById(id); // assuming MongoDB _id

    if (!existedAdmin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const isMatch = await existedAdmin.isPasswordCorrect(currentPassword);


            if (!isMatch) {
                console.log("Wrong Password");
                return NextResponse.json({ error: "Wrong password" }, { status: 403 });
            }
    
            existedAdmin.password = newPassword;
            await existedAdmin.save(); // ✅ Make sure it's awaited
    

    return NextResponse.json(
      {
        message: "Password changed successfully",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log("Internal Server Error: ", err);
    return NextResponse.json(
      {
        error: "Internal server Error",
      },
      {
        status: 501,
      }
    );
  }
}
