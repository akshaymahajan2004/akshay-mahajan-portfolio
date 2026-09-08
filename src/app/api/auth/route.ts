import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPasscode = process.env.ADMIN_PASSCODE;

    if (password === adminPasscode) {
      return NextResponse.json({ authenticated: true, token: 'session_akshay_2026' });
    }

    return NextResponse.json({ authenticated: false, message: 'Invalid passcode' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Auth failed' }, { status: 400 });
  }
}
