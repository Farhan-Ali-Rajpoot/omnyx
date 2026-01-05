// import transporter from "./transporter"

// interface Props {
//   to: string | string[]
//   subject: string
//   message: string
// }

// export async function SendCustomEmail({ to, subject, message }: Props): Promise<boolean> {
//   try {
//     if (!to || !subject || !message) {
//       console.log('All fields are required for Nodemailer.')
//       return false
//     }

//     await transporter.sendMail({
//       from: `Farhan Ali `,
//       to,
//       subject,
//       text: message,
//       html: `
//         <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333;">
//           <p>${message}</p>
//         </div>
//       `,
//     });
//     return true
//   } catch (err: any) {
//     console.error(`Custom Email sending failed: ${err.message}`)
//     return false
//   }
// }






















import transporter from './transporter'

interface Props {
  to: string | string[]
  subject: string
  message: string
  attachments?: {
    filename: string
    content: Buffer
    contentType: string
  }[]
}

export async function SendCustomEmail({ to, subject, message, attachments = [] }: Props): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: `Farhan Ali <your@email.com>`,
      to,
      subject,
      text: message,
      html: `<p>${message}</p>`,
      attachments,
    })
    return true
  } catch (err: any) {
    console.error(`Custom Email sending failed: ${err.message}`)
    return false
  }
}
