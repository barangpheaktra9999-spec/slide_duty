'use client';

import { useEffect, useState } from 'react';

// ១. បញ្ជីឈ្មោះនិស្សិត (ផ្ទៀងផ្ទាត់រួចរាល់៖ មិនជាន់គ្នា និងរៀបតាមលំដាប់ដែលអ្នកចង់បាន)
const STUDENT_LIST = [
  { id: 37, name: "ភួងផល សំណាង", telegram_username: "phuongphol_samnang" },
  { id: 38, name: "ម៉ក់ លីឈុន", telegram_username: "mok_lychhun" },
  { id: 1, name: "ទន់ វីរៈ", telegram_username: "ton_virak" },
  { id: 2, name: "ទិតថា រាជ្យបណ្ឌិត", telegram_username: "tittha_rachpandit" },
  { id: 3, name: "ទុយ តុង", telegram_username: "touy_tong" },
  { id: 4, name: "ទុយ សាមាស", telegram_username: "touy_samash" },
  { id: 5, name: "ទុយ សុខលាភ", telegram_username: "touy_sokleap" },
  { id: 6, name: "ទ្រី សេរីវិជ្ជា", telegram_username: "try_sereyvichea" },
  { id: 7, name: "ប៉ាន ជតពិសិដ្ឋ", telegram_username: "pan_chotpiseth" }, 
  { id: 8, name: "នាង អេនហ្គេល", telegram_username: "neang_engle" },
  { id: 9, name: "នុត ចំរើន", telegram_username: "nut_chamroeun" },
  { id: 10, name: "នូ ជាសំណាង", telegram_username: "nou_cheasamnang" },
  { id: 11, name: "នួន សំណាងតារា", telegram_username: "nuon_samnangdara" },
  { id: 13, name: "ប៉ែន សំណាង", telegram_username: "pen_samnang" },
  { id: 14, name: "ប៊ី ជុងសេង", telegram_username: "by_chongseng" },
  { id: 15, name: "ប៊ុណ្ណា ដាវីដ", telegram_username: "bunna_david" },
  { id: 16, name: "ប៊ូ ហង្សបូរី", telegram_username: "bou_hangborey" },
  { id: 17, name: "ប៊ួរ សុវណ្ណសិលា", telegram_username: "bour_sovannsela" },
  { id: 18, name: "ប៊េ សុងហ័រ", telegram_username: "be_songhor" },
  { id: 19, name: "បាន ប៊ុនយ៉ាន", telegram_username: "ban_bunyan" },
  { id: 20, name: "បាន សុងជូ", telegram_username: "ban_songjou" },
  { id: 21, name: "បារាំង ភក្ត្រា", telegram_username: "barang_pheaktra" },
  { id: 22, name: "ប្រាក់ ខេមា", telegram_username: "prak_khema" },
  { id: 23, name: "ប្រាក់ បញ្ញា", telegram_username: "prak_panha" },
  { id: 24, name: "ផន គ្រឹស្នា", telegram_username: "phorn_krishna" },
  { id: 25, name: "ផល មង្គល", telegram_username: "phol_mongkul" },
  { id: 26, name: "ផាង បញ្ញា", telegram_username: "phang_panha" },
  { id: 27, name: "ផាត់ យិនប៉", telegram_username: "phat_yinpo" },
  { id: 28, name: "ផាត់ សុវណ្ណហេង", telegram_username: "phat_sovannheng" },
  { id: 29, name: "ផុន សទ្ធា", telegram_username: "phon_sotthea" },
  { id: 30, name: "ផុល សុផល", telegram_username: "phol_sophal" },
  { id: 31, name: "ផេង គីមហុង", telegram_username: "pheng_kimhong" },
  { id: 32, name: "ផេង សុខាឌីណា", telegram_username: "pheng_sokhadina" },
  { id: 33, name: "ពាង សុវិសា", telegram_username: "peang_sovisa" },
  { id: 34, name: "ពាន ប៊ុនលី", telegram_username: "pean_bunly" },
  { id: 35, name: "ពៅ មន្នីពេជ្រ", telegram_username: "pov_monnypech" },
  { id: 36, name: "ភន់ វាសនា", telegram_username: "phon_veasna" },
  { id: 39, name: "ម៉ម ប៊ុនវាសនា", telegram_username: "mom_bunveasna" },
  { id: 40, name: "នី គីមឃាង", telegram_username: "ny_kimkheang" }
];

interface Student { id: number; name: string; telegram_username: string; }
interface DutyPair { dateKey: string; dateString: string; p1: Student; p2: Student; backup: Student; isToday: boolean; isPast: boolean; }

export default function Home() {
  const [schedule, setSchedule] = useState<DutyPair[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDateText, setCurrentDateText] = useState('');
  const [countdownText, setCountdownText] = useState('');
  const [isDutyDone, setIsDutyDone] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapTargetId, setSwapTargetId] = useState<number | string>('');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveDate, setLeaveDate] = useState('');

  // ២. អនុគមន៍បង្កើតកាលវិភាគ (Logic កែសម្រួលថ្មីឱ្យចាប់ផ្តើមពីថ្ងៃនេះ)
  const generateSchedule = (studentList: Student[]) => {
    let modifiedList = [...studentList];
    if (typeof window !== 'undefined') {
      const savedSwaps = localStorage.getItem('ite_a3_swapped_list');
      if (savedSwaps) modifiedList = JSON.parse(savedSwaps);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // រកថ្ងៃចន្ទនៃសប្តាហ៍នេះ ដើម្បីធ្វើជាគោលក្នុងការបង្ហាញបញ្ជី
    const startOfView = new Date(today);
    const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon...
    const diffToMon = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfView.setDate(today.getDate() + diffToMon);

    const len = modifiedList.length;
    const fullSchedule: DutyPair[] = [];

    // ៣. គណនា Offset ដើម្បីឱ្យ "ថ្ងៃនេះ" ស្មើនឹង Index 0 (ភួងផល សំណាង)
    // d = 0 តំណាងឱ្យថ្ងៃចន្ទក្នុង View, d = 4 តំណាងឱ្យថ្ងៃសុក្រ
    const todayIndexInView = (dayOfWeek >= 1 && dayOfWeek <= 5) ? dayOfWeek - 1 : 0;

    for (let d = 0; d < 20; d++) {
      const targetDate = new Date(startOfView);
      targetDate.setDate(startOfView.getDate() + (Math.floor(d / 5) * 7) + (d % 5));
      
      const dateKey = targetDate.toISOString().split('T')[0];
      const isTodayItem = targetDate.getTime() === today.getTime();

      // រូបមន្តវិលជុំ៖ បើ d ជាថ្ងៃនេះ នោះ baseIdx ត្រូវតែស្មើ 0
      const dayOffset = d - todayIndexInView;
      const baseIdx = ((dayOffset * 2) % len + len) % len;

      let p1 = modifiedList[baseIdx];
      let p2 = modifiedList[(baseIdx + 1) % len];
      let backup = modifiedList[(baseIdx + 2) % len];

      // ឆែកច្បាប់
      if (typeof window !== 'undefined') {
        const savedLeaves = JSON.parse(localStorage.getItem('ite_a3_leave_dates') || '[]');
        if (savedLeaves.includes(dateKey)) {
          p1 = modifiedList[(baseIdx + 2) % len];
          p2 = modifiedList[(baseIdx + 3) % len];
          backup = modifiedList[(baseIdx + 4) % len];
        }
      }

      fullSchedule.push({
        dateKey,
        dateString: targetDate.toLocaleDateString('km-KH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
        p1, p2, backup,
        isToday: isTodayItem,
        isPast: targetDate.getTime() < today.getTime(),
      });
    }
    return fullSchedule;
  };

  useEffect(() => {
    setSchedule(generateSchedule(STUDENT_LIST));
    setTimeout(() => setIsLoading(false), 1500);

    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDateText(now.toLocaleDateString('km-KH', { weekday: 'long', day: 'numeric', month: 'long' }));
      const target = new Date(); target.setHours(12, 30, 0, 0);
      const diff = target.getTime() - now.getTime();
      setCountdownText(diff > 0 ? `សល់ ${Math.floor(diff/3600000)}ម:${Math.floor((diff%3600000)/60000)}ន` : 'ហួសម៉ោង');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ៤. អនុគមន៍ជំនួយ (Telegram, Swap, Done) - រក្សាទុកដូចមុន
  const sendTelegramAlert = async (type: string, p1: Student, p2: Student, backup: Student) => {
    const BOT_TOKEN = '8880912035:AAHZIZPcZCLpPhX8PxYuebTqGIigCXciyGY';
    const CHAT_ID = '-1003502505377';
    const text = type === 'remind' 
      ? `📢 វេនយកស្លាយថ្ងៃនេះ៖\n1. *${p1.name}*\n2. *${p2.name}*\n\nសូមរៀបចំមុនម៉ោង 12:30 PM!` 
      : `✅ បញ្ចប់ភារកិច្ចដោយ៖ ${p1.name} & ${p2.name}`;
    
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
    });
    alert('ផ្ញើសាររួចរាល់!');
  };

  const todayDuty = schedule.find(s => s.isToday);

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 p-4 font-sans">
      {/* Loading Screen */}
      {isLoading && <div className="fixed inset-0 bg-black z-50 flex items-center justify-center text-emerald-400 font-bold">ITE A3 LOADING...</div>}

      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold text-emerald-400">វេនយកស្លាយ ITE A3</h1>
          <p className="text-xs text-slate-400">{currentDateText} | <span className="text-amber-400">{countdownText}</span></p>
        </div>

        {/* Today's Card */}
        {todayDuty && (
          <div className="bg-[#0f172a] border border-emerald-500/30 rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-1 rounded font-bold">ACTIVE TODAY</span>
              <button onClick={() => {navigator.clipboard.writeText(`${todayDuty.p1.name} & ${todayDuty.p2.name}`); alert('Copied!');}} className="text-xs">📋</button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white/5 rounded-2xl">
                <p className="text-[9px] text-slate-500 uppercase font-bold">សមាជិក ១</p>
                <p className="text-sm font-bold">{todayDuty.p1.name}</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-2xl">
                <p className="text-[9px] text-slate-500 uppercase font-bold">សមាជិក ២</p>
                <p className="text-sm font-bold">{todayDuty.p2.name}</p>
              </div>
            </div>

            <div className="mt-4 bg-red-500/10 p-2 rounded-xl text-center">
              <p className="text-[10px] text-red-400">🚨 វេនបម្រុង៖ {todayDuty.backup.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-6">
              <button onClick={() => sendTelegramAlert('remind', todayDuty.p1, todayDuty.p2, todayDuty.backup)} className="bg-emerald-600 py-2 rounded-xl text-xs font-bold">🔔 រំលឹកក្នុងគ្រុប</button>
              <button onClick={() => setIsDutyDone(true)} className="bg-slate-100 text-black py-2 rounded-xl text-xs font-bold">✅ រួចរាល់</button>
            </div>
          </div>
        )}

        {/* Search & List */}
        <input 
          type="text" 
          placeholder="ស្វែងរកឈ្មោះ..." 
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-sm"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase">កាលវិភាគបន្ទាប់</h3>
          {schedule.filter(s => s.p1.name.includes(searchQuery)).map((item, i) => (
            <div key={i} className={`p-4 rounded-2xl border ${item.isToday ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-800 bg-slate-900/50'}`}>
              <div className="flex justify-between items-center text-xs">
                <span className={item.isToday ? 'text-emerald-400 font-bold' : 'text-slate-400'}>{item.dateString}</span>
                <span className="text-slate-200">{item.p1.name} & {item.p2.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}