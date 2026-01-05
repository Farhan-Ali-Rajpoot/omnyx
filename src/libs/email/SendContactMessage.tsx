import transporter from "@/libs/email/transporter";

const contactEmail = process.env.CONTACT_EMAIL || 'midlelnight@gmail.com';

export async function sendContactMessageEmail({ name, email, message }: {
  name: string,
  email: string,
  message: string
}) {
  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: contactEmail,
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #374151;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background-color: #f9fafb;
        ">
          <div style="
            text-align: center;
            margin-bottom: 24px;
          ">
            <h1 style="
              font-size: 24px;
              font-weight: 600;
              color: #1f2937;
              margin-bottom: 8px;
            ">
              New Contact Message
            </h1>
            <p style="color: #6b7280; margin-bottom: 0;">
              From your website contact form
            </p>
          </div>

          <div style="
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            border: 1px solid #e5e7eb;
            margin-bottom: 20px;
          ">
            <div style="margin-bottom: 16px;">
              <h2 style="
                font-size: 16px;
                font-weight: 500;
                color: #4b5563;
                margin-bottom: 4px;
              ">
                From:
              </h2>
              <p style="margin: 0; font-size: 18px;">
                ${name} &lt;${email}&gt;
              </p>
            </div>

            <div>
              <h2 style="
                font-size: 16px;
                font-weight: 500;
                color: #4b5563;
                margin-bottom: 4px;
              ">
                Message:
              </h2>
              <div style="
                background-color: #f3f4f6;
                padding: 12px;
                border-radius: 6px;
                font-size: 16px;
                line-height: 1.5;
                white-space: pre-wrap;
              ">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>

          <div style="
            text-align: center;
            color: #6b7280;
            font-size: 14px;
            padding-top: 16px;
            border-top: 1px solid #e5e7eb;
          ">
            <p style="margin: 0;">
              This message was sent via your website contact form.
            </p>
            <p style="margin: 8px 0 0;">
              <a href="mailto:${email}" style="color: #7c3aed; text-decoration: none;">
                Reply to ${name}
              </a>
            </p>
          </div>
        </div>
      `
    });

    return { success: true };
  } catch (err) {
    console.error('Error sending contact email:', err);
    throw new Error('Failed to send message');
  }
}