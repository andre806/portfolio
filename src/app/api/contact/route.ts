export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { submission } = body;

        // Validate required fields
        if (!submission || !submission.name || !submission.email || !submission.subject || !submission.message) {
            return NextResponse.json(
                { error: 'Required fields not provided' },
                { status: 400 }
            );
        }

        // Create Nodemailer transporter (Gmail App Password)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        // Compose email
        const mailOptions = {
            from: `"${submission.name}" <${process.env.GMAIL_USER}>`,
            to: 'acode775@gmail.com',
            subject: submission.subject,
            text: `Name: ${submission.name}\nEmail: ${submission.email}\nMessage: ${submission.message}`,
            html: `<div><p><b>Name:</b> ${submission.name}</p><p><b>Email:</b> ${submission.email}</p><p><b>Message:</b><br>${submission.message.replace(/\n/g, '<br>')}</p></div>`
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({
            success: true,
            message: 'Message sent successfully',
            submissionId: submission.id
        });

    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

// ...removido código auxiliar antigo...
