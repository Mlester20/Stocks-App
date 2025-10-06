import nodemailer from "nodemailer";
import { WELCOME_EMAIL_TEMPLATE } from "./templates";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
    },
});

export const sendWelcomeEmail = async ({email, name, intro}: WelcomeEmailData) => {
    const htmlTEMPLATE =  WELCOME_EMAIL_TEMPLATE
    .replace('{{name}}', name)
    .replace('{{intro}}', intro);

    const mailOptions = {
        from: `"Signalist <signalist@gmail.com>"`,
        to: email,
        subject: `Welcome to Signalist! - your personal stock market assistant`,
        text: 'Thanks for joining Signalist! We\'re excited to have you on board.',
        html: htmlTEMPLATE,
    };

    await transporter.sendMail(mailOptions);
}