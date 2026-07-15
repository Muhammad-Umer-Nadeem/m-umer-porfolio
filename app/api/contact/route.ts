// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { sql } from '@vercel/postgres';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
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
      // Create table if it doesn't exist
      await sql`
        CREATE TABLE IF NOT EXISTS contacts (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // Insert contact
      await sql`
        INSERT INTO contacts (name, email, message)
        VALUES (${sanitizedName}, ${sanitizedEmail}, ${sanitizedMessage})
      `;
      
      console.log('Contact saved to database');
    } catch (dbError) {
      console.error('Database error (continuing anyway):', dbError);
      // Continue even if database fails - email is more important
    }

    // Send email
    const recipientEmail = process.env.CONTACT_EMAIL || 'umernadeem005@gmail.com';

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [recipientEmail],
      replyTo: sanitizedEmail,
      subject: `New Contact: ${sanitizedName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
            <div style="max-width: 560px; margin: 40px auto; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">
              
              <div style="padding: 32px 32px 20px; border-bottom: 1px solid #e0e0e0;">
                <h1 style="margin: 0; font-size: 20px; font-weight: 600; color: #1a1a1a;">New Contact Form Submission</h1>
              </div>
              
              <div style="padding: 24px 32px 32px;">
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px; color: #666666; width: 70px;">From</td>
                    <td style="padding: 8px 0; font-size: 14px; color: #1a1a1a; font-weight: 500;">${sanitizedName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px; color: #666666;">Email</td>
                    <td style="padding: 8px 0; font-size: 14px; color: #1a1a1a;">${sanitizedEmail}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-size: 14px; color: #666666;">Date</td>
                    <td style="padding: 8px 0; font-size: 14px; color: #1a1a1a;">${new Date().toLocaleString()}</td>
                  </tr>
                </table>
                
                <h2 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #1a1a1a;">Message</h2>
                <div style="background: #f9f9f9; padding: 16px; border-left: 3px solid #1a1a1a; margin-bottom: 28px; font-size: 14px; color: #333333; line-height: 1.6; white-space: pre-wrap;">${sanitizedMessage}</div>
                
                <a href="mailto:${sanitizedEmail}?subject=Re: Portfolio Contact" style="display: inline-block; padding: 10px 20px; background: #1a1a1a; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 500; border-radius: 6px;">
                  Reply to ${sanitizedName}
                </a>
                
              </div>
              
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Message sent successfully!', id: data?.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('Server Error:', error);
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