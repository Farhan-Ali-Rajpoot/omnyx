import { NextResponse } from "next/server";
import { sendContactMessageEmail } from "@/libs/email/SendContactMessage";
import  { isRequestUnauthorized } from "@/libs/middleware/verifyRequestSource";



export async function POST(req: Request) {
    try {
        const unauthorizedResponse = await isRequestUnauthorized(req);
            if (unauthorizedResponse) return unauthorizedResponse;

        const body = await req.json();

        const { name, email, message } = body;

        if (!name || !email || !message) {
            console.log('All fields are required');
            return NextResponse.json({
                error: 'All fields are required'
            }, {
                status: 401
            });
        }

        await sendContactMessageEmail({ name, email, message });

        return NextResponse.json({
            mesage: 'Message sent'
        }, {
            status: 201
        })


    } catch (err) {
        console.log(err);
        return NextResponse.json({
            error: 'Internal server error'
        }, {
            status: 501
        })
    }
}