import { NextResponse } from 'next/server';
import UserModel from '@/models/user.model';
import { cookies } from 'next/headers';
import { connectDB } from '@/libs/db/connectDB';
import { isRequestUnauthorized } from '@/libs/middleware/verifyRequestSource';
import { Tokens } from '@/config/tokens';


export async function POST(req: Request) {
    try {
        const unauthorizedResponse = await isRequestUnauthorized(req);
            if (unauthorizedResponse) return unauthorizedResponse;

        await connectDB();

        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const existedUser = await UserModel.findOne({ email });

        if (!existedUser) {
            console.log('Wrong credentials');
            return NextResponse.json({
                error: 'Wrong credentials'
            }, {
                status: 401
            });
        }

        const isMatch = await existedUser.isPasswordCorrect({password});

        if (!isMatch) {
            console.log('Wrong credentials (Password not correct)');
            return NextResponse.json({
                error: 'Wrong credentials'
            }, {
                status: 403
            });
        }

        if (!existedUser.verified){
            console.log("User not verified ( Login attempt )");
            return NextResponse.json({
                error: "This Account requires verification "
            },{
                status: 401
            })
        }

        const token = await existedUser.generateJWT({ cfg: Tokens.user.session });

        (await cookies()).set(Tokens.user.session.cookieName, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return NextResponse.json({
            message: 'Logged in successfully'
        }, {
            status: 201
        });

    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json({
            error: 'Internal server error'
        }, {
            status: 501
        });
    }
}
