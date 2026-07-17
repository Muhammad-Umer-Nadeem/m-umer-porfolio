// lib/mail.ts
import nodemailer from "nodemailer";

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
