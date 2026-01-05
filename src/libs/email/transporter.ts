import * as nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

const email = process.env.APP_EMAIL || 'farhan.devmail@gmail.com';
const password = process.env.APP_EMAIL_PASSWORD || 'idyt xlhc dgqz mqhe';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: email,
        pass: password,
    },
} as SMTPTransport.Options);

export default transporter;
