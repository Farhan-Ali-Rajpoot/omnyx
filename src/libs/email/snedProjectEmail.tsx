import transporter from "./transporter";

interface Props {
    name: string;
    email: string;
    message: string;
}

const contactEmail = process.env.CONTACT_EMAIL || 'midlelnight@gmail.com';

export async function sendProjectEmail({ name, email, message }: Props) {
    try {
        await transporter.sendMail({
            from: process.env.APP_EMAIL,
            to: contactEmail,
            subject: 'Web Project (Tendor)',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h1 style="color: #333; text-align: center; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
                        New Project Inquiry
                    </h1>
                    
                    <div style="margin: 20px 0;">
                        <h2 style="color: #444; font-size: 18px; margin-bottom: 5px;">You've received a new message from:</h2>
                        <p style="font-size: 16px; margin: 5px 0;">
                            <strong>Name:</strong> ${name}
                        </p>
                        <p style="font-size: 16px; margin: 5px 0;">
                            <strong>Email:</strong> <a href="mailto:${email}" style="color: #0066cc;">${email}</a>
                        </p>
                    </div>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #444; font-size: 16px; margin-top: 0; margin-bottom: 10px;">Message:</h3>
                        <p style="font-size: 15px; line-height: 1.5; margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; color: #777; font-size: 14px; border-top: 1px solid #f0f0f0; padding-top: 15px;">
                        <p>This email was sent from your website contact form.</p>
                        <p>© ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                    </div>
                </div>
            `
        });
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}