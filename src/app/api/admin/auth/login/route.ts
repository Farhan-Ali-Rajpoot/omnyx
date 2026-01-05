import { NextResponse } from "next/server";
import { connectDB } from "@/libs/db/connectDB";
import AdminModel from '@/models/admin.model';
import { cookies } from "next/headers";


export async function POST(req: Request) {
    try {

        connectDB();

        const body = await req.json();
        const { name, password } = body;

        if (!name || !password) {
            console.log('All fields are required');
            return NextResponse.json({
                error: 'All fields are required'
            }, {
                status: 403
            });
        };

        // const authName = process.env.ADMIN_NAME, authPassword = process.env.ADMIN_PASSWORD;

        const existedAdmin = await AdminModel.findOne({ name });

        if (!existedAdmin) {
            console.log("No such Admin exists");
            return NextResponse.json({
                error: 'Wrong Credentials'
            }, {
                status: 401
            });
        };

        const isMatch = await existedAdmin.isPasswordCorrect(password);

        if (!isMatch) {
            console.log('Wrong Credentials');
            return NextResponse.json({
                error: 'Wrong Credentials'
            }, {
                status: 403
            });
        };

        const token = await existedAdmin.generateJWT();

        const cookiesStore = (await cookies());

        cookiesStore.set('_adminAuthToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return NextResponse.json({
            message: 'Sucessfully logined'
        }, {
            status: 201
        });






    } catch (err){
        console.log(`Internal server error ${err}`);
        return NextResponse.json({
            error: `Internal server error`
        }, {
            status: 501
        })
    }
}