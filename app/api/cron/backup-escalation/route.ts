import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // ករណីគ្មានអ្នកមក Check-in ដល់ម៉ោងកំណត់ ប្រព័ន្ធប្រកាសអាសន្នហៅអ្នកបម្រុង (Backup)
    const alertMessage = `⚠️ *ការប្រកាសអាសន្នស្វ័យប្រវត្ត (Backup Escalation)* ⚠️\n\nដោយសារតែដល់ម៉ោងកំណត់ហើយ តែពុំទាន់មានសមាជិកចម្បងមកចុចបញ្ជាក់វត្តមាន Check-in ឡើយ។ កាតព្វកិច្ចត្រូវបានផ្ទេរទៅជូន *សមាជិកបម្រុង (Backup Member)* ស្វ័យប្រវត្ត សូមអញ្ជើញទៅជួយរៀបចំស្លាយក្នុងថ្នាក់បន្ទាន់!`;

    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: alertMessage,
        parse_mode: 'Markdown',
      }),
    });

    return NextResponse.json({ success: true, message: 'Backup escalation alert triggered' });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}