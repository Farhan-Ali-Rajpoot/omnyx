import transporter from "@/libs/email/transporter";
import { appName, appEmail } from "@/config/meta/app";

export interface RegistrationVerificationEmailProps {
  to: string;
  name: string;
  verificationCode: string | number;
}

export async function sendRegistrationVerificationEmail({ to, name, verificationCode }: RegistrationVerificationEmailProps): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: `"${appName}" <${appEmail}>`,
      to,
      subject: `Verify Your Email for ${appName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Hello ${name},</h2>
          <p>Thank you for signing up at <strong>${appName}</strong>.</p>
          <p>Please use the verification code below to confirm your email address:</p>

          <div style="margin: 20px 0; text-align: center;">
            <span style="
              display: inline-block;
              padding: 10px 20px;
              font-size: 1.5rem;
              font-weight: bold;
              letter-spacing: 4px;
              background-color: #f0f0f0;
              border-radius: 8px;
            ">${verificationCode}</span>
          </div>

          <p>If you did not create this account, please ignore this email.</p>
        </div>
      `
    });

    return true;
  } catch (err) {
    console.error("Email sending failed:", err);
    return false;
  }
}
