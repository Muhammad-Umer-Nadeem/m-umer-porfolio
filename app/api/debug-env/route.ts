// app/api/debug-env/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Only for debugging - remove after testing
  const hasGmailUser = !!process.env.GMAIL_USER;
  const hasGmailPass = !!process.env.GMAIL_APP_PASSWORD;
  
  return NextResponse.json({
    hasGmailUser,
    hasGmailPass,
    gmailUserPrefix: process.env.GMAIL_USER?.substring(0, 5) + '...',
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  });
}
