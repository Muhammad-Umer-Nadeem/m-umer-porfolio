// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer'; // Import nodemailer
import { transporter, verifyEmailConfig } from "@/lib/mail";
import { sql } from '@vercel/postgres';

export async function POST(request: NextRequest) {
    // Verify email config first
    const verifyResult = await verifyEmailConfig();
    if (!verifyResult.success) {
        console.error('Email configuration error:', verifyResult.error);
    }

    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        if (name.length < 2) {
            return NextResponse.json(
                { error: 'Name must be at least 2 characters' },
                { status: 400 }
            );
        }

        if (message.length < 10) {
            return NextResponse.json(
                { error: 'Message must be at least 10 characters' },
                { status: 400 }
            );
        }

        // Sanitize inputs
        const sanitizedName = name.trim().replace(/<[^>]*>/g, '');
        const sanitizedEmail = email.trim().toLowerCase();
        const sanitizedMessage = message.trim().replace(/<[^>]*>/g, '');

        // Store in database
        try {
            await sql`
                CREATE TABLE IF NOT EXISTS contacts (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    message TEXT NOT NULL,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                );
            `;

            await sql`
                INSERT INTO contacts (name, email, message)
                VALUES (${sanitizedName}, ${sanitizedEmail}, ${sanitizedMessage})
            `;
        } catch (dbError) {
            console.error('Database error (continuing anyway):', dbError);
            // Continue even if database fails - email is more important
        }

        // Send notification email
        try {
            
            const mailOptions = {
                from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
                to: process.env.GMAIL_USER,
                replyTo: sanitizedEmail,
                subject: `📩 New Portfolio Contact from ${sanitizedName}`,
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                    </head>
                    <body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:40px;">
                        <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;padding:30px;border:1px solid #e5e5e5;">
                            <h2 style="margin-top:0;">New Contact Form Submission</h2>
                            <table style="width:100%;border-collapse:collapse;">
                                <tr>
                                    <td style="padding:8px 0;"><strong>Name</strong></td>
                                    <td>${sanitizedName}</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0;"><strong>Email</strong></td>
                                    <td>${sanitizedEmail}</td>
                                </tr>
                                <tr>
                                    <td style="padding:8px 0;"><strong>Date</strong></td>
                                    <td>${new Date().toLocaleString()}</td>
                                </tr>
                            </table>
                            <hr style="margin:25px 0;">
                            <h3>Message</h3>
                            <div style="background:#fafafa;padding:15px;border-left:4px solid #111;white-space:pre-wrap;">
                                ${sanitizedMessage}
                            </div>
                            <br>
                            <a href="mailto:${sanitizedEmail}?subject=Re: Portfolio Contact" 
                               style="background:#111;color:#fff;padding:12px 20px;text-decoration:none;border-radius:5px;display:inline-block;">
                                Reply to ${sanitizedName}
                            </a>
                        </div>
                    </body>
                    </html>
                `
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.messageId);
            
        } catch (emailError: unknown) {
            console.error('Failed to send notification email:', {
                message: emailError instanceof Error ? emailError.message : 'Unknown error',
                code: emailError instanceof Error && 'code' in emailError ? (emailError as any).code : undefined,
                response: emailError instanceof Error && 'response' in emailError ? (emailError as any).response : undefined,
            });
            
            // Try with alternative configuration
            try {
                console.log('Attempting with alternative config...');
                const altTransporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_APP_PASSWORD,
                    },
                });
                
                await altTransporter.sendMail({
                    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
                    to: process.env.GMAIL_USER,
                    replyTo: sanitizedEmail,
                    subject: `📩 New Portfolio Contact from ${sanitizedName}`,
                    html: `...` // Your HTML content
                });
                
                console.log('Email sent with alternative config');
            } catch (altError: unknown) {
                console.error('Alternative config also failed:', {
                    message: altError instanceof Error ? altError.message : 'Unknown error',
                });
                
                return NextResponse.json(
                    { 
                        error: "Unable to send your message. Please try again later.",
                        details: process.env.NODE_ENV === 'development' 
                            ? (emailError instanceof Error ? emailError.message : 'Unknown error')
                            : undefined
                    },
                    { status: 500 }
                );
            }
        }

        // Send confirmation email to visitor
        try {
            await transporter.sendMail({
                from: `"Muhammad Umer" <${process.env.GMAIL_USER}>`,
                to: sanitizedEmail,
                subject: "Thank you for contacting me!",
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                    </head>
                    <body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:40px;">
                        <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;padding:30px;border:1px solid #e5e5e5;">
                            <h2>Hi ${sanitizedName}, 👋</h2>
                            <p>Thank you for reaching out through my portfolio website.</p>
                            <p>I have successfully received your message and will review it shortly.</p>
                            <div style="margin:25px 0;padding:15px;background:#fafafa;border-left:4px solid #111;">
                                "${sanitizedMessage}"
                            </div>
                            <p>I'll get back to you as soon as possible.</p>
                            <br>
                            <p>
                                Best regards,<br>
                                <strong>Muhammad Umer</strong><br>
                                Software Engineer
                            </p>
                        </div>
                    </body>
                    </html>
                `
            });
        } catch (confirmationError: unknown) {
            console.error('Confirmation email failed:', {
                message: confirmationError instanceof Error ? confirmationError.message : 'Unknown error',
            });
        }

        return NextResponse.json(
            {
                success: true,
                message: "Your message has been sent successfully.",
            },
            { status: 200 }
        );

    } catch (error: unknown) {
        console.error('Server Error:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
        });
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Simple GET - just to confirm endpoint exists
export async function GET() {
    return NextResponse.json(
        { message: 'Contact form API endpoint. Use POST to submit.' },
        { status: 200 }
    );
}
