// lib/mail.ts
import nodemailer from "nodemailer";

// Log environment variable status during module initialization
console.log('Mail module loaded - GMAIL_USER exists:', !!process.env.GMAIL_USER);
console.log('Mail module loaded - GMAIL_APP_PASSWORD exists:', !!process.env.GMAIL_APP_PASSWORD);

// Validate environment variables
if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
  console.error('Missing email credentials in environment variables');
}

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
    // Add these for better reliability
    tls: {
        rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
});

// Add a verify function for debugging
export async function verifyEmailConfig() {
    try {
        await transporter.verify();
        console.log('Email configuration verified successfully');
        return { success: true };
    } catch (error: unknown) {
        console.error('Email verification failed:', error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error',
            code: error instanceof Error && 'code' in error ? (error as any).code : undefined
        };
    }
}
