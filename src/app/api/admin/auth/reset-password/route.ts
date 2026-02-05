import { NextResponse } from "next/server";
import { connectDB } from "@/libs/db/connectDB";
import AdminModel from "@/models/admin.model";

export async function POST(req: any) {
    try{

        await connectDB();

        const { secretKey, password, name } = await req.json();

        if(!secretKey || !password){
            console.log('Missing fields');
            return NextResponse.json({
                error: "All fields are required"
            }, {
                status: 400
            })
        }

       const secret_Key = process.env.SECRET_KEY;

       if( secretKey !== secret_Key){
            console.log('Wrong Secret Key');
            return NextResponse.json({
                error: "Wrong Secret Key"
            }, {
                status: 403
            });
        };

        const existedAdmin = await AdminModel.findOne({ name });

        if(!existedAdmin){
            return NextResponse.json({
                error: "Admin not found"
            }, {
                status: 404
            });
        };

        existedAdmin.password = password;
        await existedAdmin.save(); 

        return NextResponse.json({
            message: "Password reset successfully"
        }, {
            status: 200
        });


    }catch(err){
        console.log('Internal Server Error',err);
        return NextResponse.json({
            error: "Internal server Error"
        }, {
            status: 501
        })
    }
} 