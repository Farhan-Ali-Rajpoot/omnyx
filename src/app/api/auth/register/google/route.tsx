import { NextResponse } from "next/server";
import UserModel from '@/models/user.model';
import { cookies } from "next/headers";
import { connectDB } from "@/libs/db/connectDB";
import { isRequestUnauthorized } from "@/libs/middleware/verifyRequestSource";


export async function POST(req: Request) {
    try {
        const unauthorizedResponse = await isRequestUnauthorized(req);
        if (unauthorizedResponse) return unauthorizedResponse;

        await connectDB();

        const body = await req.json();

        const { email, name, picture, provider, password } = body;

        const existedUser = await UserModel.findOne({
            $or: [{ email }, { name }]
        });

        if (existedUser) {
            console.log('User already exists');
            return NextResponse.json({
                error: 'User Account with this email already exists!'
            }, {
                status: 401
            })
        };

        // ✅ Field validation
        if (!email || !name || !password || provider !== 'google') {
            console.log('All fields are required!');
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // ✅ Proper length checks
        if (email.length <= 6 || name.length <= 2 || password.length <= 6) {
            console.log('Invalid credentials');
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
        }

        const _picture = provider === 'google' ? picture : undefined;

        // ✅ Create user
        const verified = true;
        const user = await UserModel.create({
            email,
            name,
            password,
            picture: _picture,
            provider,
            verified,
        });

        // ✅ Generate token and set cookie
        const token = await user.generateJWT();

        (await cookies()).set('_authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
