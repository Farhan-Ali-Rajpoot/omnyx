// import { NextRequest, NextResponse } from "next/server";
// import verifyRequestSource from "@/libs/middleware/auth/verifyRequestSource";
// import { SendCustomEmail } from "@/utils/nodemailer/SendCustomEmail";

// export async function POST(req: NextRequest) {
//   try {
//     const check = await verifyRequestSource(req);
//     if (check) return check;

//     const body = await req.json();
//     const { recipients, subject, message } = body;

//     if (!recipients || !subject || !message) {
//       console.log('All fields required.');
//       return NextResponse.json(
//         { error: 'All fields are required!' },
//         { status: 400 }
//       );
//     }

//     const to = Array.isArray(recipients) ? recipients : [recipients];

//     const result = await SendCustomEmail({
//       to,
//       subject,
//       message,
//     });

//     if (!result) {
//       return NextResponse.json(
//         { error: 'Failed to send email.' },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, message: 'Email sent successfully!' },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error(`Internal Server Error: ${err}`);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }























import { NextRequest, NextResponse } from 'next/server'
import { SendCustomEmail } from '@/libs/email/SendCustomEmail'

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('x-auth-secret')
    if (authHeader !== process.env.NEXT_PUBLIC_AUTH_HEADERS_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()

    const recipients = formData.getAll('recipients[]').map(r => r.toString().trim()).filter(Boolean)
    const subject = formData.get('subject')?.toString()
    const message = formData.get('message')?.toString()

    const file = formData.get('attachment') as File | null

    let attachments = []
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer())
      attachments.push({
        filename: file.name,
        content: buffer,
        contentType: file.type,
      })
    }

    const success = await SendCustomEmail({
      to: recipients,
      subject: subject || '',
      message: message || '',
      attachments,
    })

    return NextResponse.json({ success })
  } catch (err: any) {
    console.error('[Email Error]', err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
