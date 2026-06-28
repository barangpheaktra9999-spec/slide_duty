import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // ផ្ទៀងផ្ទាត់ការហៅចូលពីម៉ាស៊ីន Cron Jobs របស់ Vercel ធានាសុវត្ថិភាព
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // សារផ្ញើទៅកាន់ Group Telegram រំលឹកវាគ្មិនប្រចាំថ្ងៃ
    const message = `🔔 *ការរំលឹកស្វ័យប្រវត្តពីប្រព័ន្ធ Dashboard* 🔔\n\nសូមជម្រាបសមាជិកដែលមានវេនប្រចាំថ្ងៃនេះ មេត្តាមកពិនិត្យ និងរៀបចំឧបករណ៍ស្លាយប្រចាំថ្នាក់ឱ្យបានទាន់ពេលវេលា និងកុំភ្លេចចុច Confirm វត្តមាននៅលើ Portal ផងបាទ!`;

    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    return NextResponse.json({ success: true, message: 'Reminder sent successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}