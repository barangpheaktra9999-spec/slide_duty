import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const data: Record<string, string> = {};
  
  searchParams.forEach((value, key) => {
    data[key] = value;
  });

  const { hash, ...hashData } = data;

  if (!hash) {
    return NextResponse.json({ error: 'Missing hash parameters' }, { status: 400 });
  }

  // តម្រៀប Key តាមលំដាប់អក្សរដើម្បីឆែកហត្ថលេខាឌីជីថល
  const dataCheckString = Object.keys(hashData)
    .sort()
    .map((key) => `${key}=${hashData[key]}`)
    .join('\n');

  const secretKey = crypto
    .createHash('sha256')
    .update(process.env.TELEGRAM_BOT_TOKEN || '')
    .digest();

  const hmac = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  // ប្រសិនបើ Hash ផ្ទៀងផ្ទាត់ត្រូវ គឺអនុញ្ញាតឱ្យ Login
  if (hmac === hash) {
    return NextResponse.json({ authenticated: true, user: hashData });
  }

  return NextResponse.json({ authenticated: false, error: 'Invalid data signature' }, { status: 401 });
}