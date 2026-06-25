'use client';

import { useEffect, useState } from 'react';

// បញ្ជីឈ្មោះនិស្សិត ITE A3
const STUDENT_LIST = [
  { id: 37, name: "ភួងផល សំណាង", telegram_username: "phuongphol_samnang" },
  { id: 38, name: "ម៉ក់ លីឈុន", telegram_username: "mok_lychhun" },
  { id: 1, name: "ទន់ វីរៈ", telegram_username: "ton_virak" },
  { id: 2, name: "ទិតថា រាជ្យបណ្ឌិត", telegram_username: "tittha_rachpandit" },
  { id: 3, name: "ទុយ តុង", telegram_username: "touy_tong" },
  { id: 4, name: "ទុយ សាមាស", telegram_username: "touy_samash" },
  { id: 5, name: "ទុយ សុខលាភ", telegram_username: "touy_sokleap" },
  { id: 6, name: "ទ្រី សេរីវិជ្ជា", telegram_username: "try_sereyvichea" },
  { id: 7, name: "នន សុធារិទ្ធិ", telegram_username: "non_sothearith" },
  { id: 8, name: "នាង អេនហ្គេល", telegram_username: "neang_engle" },
  { id: 9, name: "នុត ចំរើន", telegram_username: "nut_chamroeun" },
  { id: 10, name: "នូ ជាសំណាង", telegram_username: "nou_cheasamnang" },
  { id: 11, name: "នួន សំណាងតារា", telegram_username: "nuon_samnangdara" },
  { id: 12, name: "ប៉ាន ជតពិសិដ្ឋ", telegram_username: "pan_chotpiseth" },
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

interface Student {
  id: number;
  name: string;
  telegram_username: string;
}

interface DutyPair {
  dateKey: string;
  dateString: string;
  p1: Student;
  p2: Student;
  backup: Student;
  isToday: boolean;
  isPast: boolean;
}

export default function Home() {
  const [schedule, setSchedule] = useState<DutyPair[]>([]);
  const [isWeekend, setIsWeekend] = useState(false);
  const [currentDateText, setCurrentDateText] = useState('');
  const [countdownText, setCountdownText] = useState('');
  
  const [isDutyDone, setIsDutyDone] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [notificationPermission, setNotificationPermission] = useState('default');
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapTargetId, setSwapTargetId] = useState<number | string>('');
  const [leaveDate, setLeaveDate] = useState('');
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  // Logic បង្ហាញកាលវិភាគ
  const generateSchedule = (studentList: Student[]) => {
    if (studentList.length === 0) return [];
    
    let modifiedList = [...studentList];
    if (typeof window !== 'undefined') {
      const savedSwaps = localStorage.getItem('ite_a3_swapped_list');
      if (savedSwaps) modifiedList = JSON.parse(savedSwaps);
    }

    const pairs: { p1: Student; p2: Student; backup: Student }[] = [];
    for (let i = 0; i < modifiedList.length; i += 2) {
      pairs.push({
        p1: modifiedList[i],
        p2: modifiedList[i + 1] || modifiedList[0],
        backup: modifiedList[(i + 2) % modifiedList.length]
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(today);
    const currentDayNum = today.getDay();
    const distanceToMonday = currentDayNum === 0 ? -6 : 1 - currentDayNum;
    startOfWeek.setDate(today.getDate() + distanceToMonday);

    let leaveDates: string[] = [];
    if (typeof window !== 'undefined') {
      const savedLeaves = localStorage.getItem('ite_a3_leave_dates');
      if (savedLeaves) leaveDates = JSON.parse(savedLeaves);
    }

    const fullSchedule: DutyPair[] = [];
    for (let d = 0; d < 20; d++) {
      const targetDate = new Date(startOfWeek);
      targetDate.setDate(startOfWeek.getDate() + (Math.floor(d / 5) * 7) + (d % 5));
      
      const year = targetDate.getFullYear();
      const month = String(targetDate.getMonth() + 1).padStart(2, '0');
      const day = String(targetDate.getDate()).padStart(2, '0');
      const dateKey = `${year}-${month}-${day}`;

      const isTodayItem = targetDate.getTime() === today.getTime();
      
      let pairIndex = d % pairs.length;
      if (isTodayItem) {
        pairIndex = 0; 
      }

      let p1 = pairs[pairIndex].p1;
      let p2 = pairs[pairIndex].p2;
      let backup = pairs[pairIndex].backup;

      if (leaveDates.includes(dateKey)) {
        if (p1.id === studentList[pairIndex].p1.id) {
          p1 = backup;
        }
      }

      fullSchedule.push({
        dateKey,
        dateString: targetDate.toLocaleDateString('km-KH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        p1, p2, backup,
        isToday: isTodayItem,
        isPast: targetDate.getTime() < today.getTime(),
      });
    }
    return fullSchedule;
  };

  useEffect(() => {
    setSchedule(generateSchedule(STUDENT_LIST));
    
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationPermission(Notification.permission);
    }

    const storedStatus = localStorage.getItem('ite_a3_duty_done_state');
    const storedDate = localStorage.getItem('ite_a3_duty_done_date');
    const todayStr = new Date().toDateString();
    if (storedStatus === 'true' && storedDate === todayStr) {
      setIsDutyDone(true);
    }

    const timer = setInterval(() => {
      const now = new Date();
      setIsWeekend(now.getDay() === 0 || now.getDay() === 6);
      setCurrentDateText(now.toLocaleDateString('km-KH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));

      const targetTime = new Date();
      targetTime.setHours(12, 30, 0, 0);
      const diff = targetTime.getTime() - now.getTime();
      setCountdownText(diff > 0 ? `សល់ពេល ${Math.floor(diff / (1000 * 60 * 60))}ម៉ោង ${Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))}នាទី` : 'ហួសម៉ោងកំណត់ (12:30 PM)');
    }, 1000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(timer);
    };
  }, []);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) return alert('Browser នេះមិនគាំទ្រមុខងារ Pop-up ទេ។');
    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
  };

  // ✅ មុខងារប្ដូរវេន រួមទាំងបាញ់សារទៅ Telegram
  const handleSwapDuty = () => {
    if (!swapTargetId || !todayDuty) return;
    let currentList = [...STUDENT_LIST];
    const savedSwaps = localStorage.getItem('ite_a3_swapped_list');
    if (savedSwaps) currentList = JSON.parse(savedSwaps);

    const idx1 = currentList.findIndex(s => s.id === todayDuty.p1.id);
    const idx2 = currentList.findIndex(s => s.id === Number(swapTargetId));

    if (idx1 !== -1 && idx2 !== -1) {
      const targetStudent = currentList[idx2]; 
      
      const temp = currentList[idx1];
      currentList[idx1] = currentList[idx2];
      currentList[idx2] = temp;
      
      localStorage.setItem('ite_a3_swapped_list', JSON.stringify(currentList));
      setSchedule(generateSchedule(STUDENT_LIST));
      
      sendTelegramAlert('swap', todayDuty.p1, targetStudent, todayDuty.backup);
      
      setShowSwapModal(false);
      setSwapTargetId('');
    }
  };

  // ✅ មុខងារសុំច្បាប់ រួមទាំងបាញ់សារទៅ Telegram
  const handleRequestLeave = () => {
    if (!leaveDate || !todayDuty) return;
    let currentLeaves = [];
    const savedLeaves = localStorage.getItem('ite_a3_leave_dates');
    if (savedLeaves) currentLeaves = JSON.parse(savedLeaves);

    if (!currentLeaves.includes(leaveDate)) {
      currentLeaves.push(leaveDate);
      localStorage.setItem('ite_a3_leave_dates', JSON.stringify(currentLeaves));
      setSchedule(generateSchedule(STUDENT_LIST));
      
      sendTelegramAlert('leave', todayDuty.p1, todayDuty.p2, todayDuty.backup);
      
      setShowLeaveModal(false);
      setLeaveDate('');
    }
  };

  const handleMarkAsDone = () => {
    const todayStr = new Date().toDateString();
    setIsDutyDone(true);
    localStorage.setItem('ite_a3_duty_done_state', 'true');
    localStorage.setItem('ite_a3_duty_done_date', todayStr);
    if (todayDuty) sendTelegramAlert('done', todayDuty.p1, todayDuty.p2, todayDuty.backup);
  };

  const copyToClipboard = () => {
    if (!todayDuty) return;
    const text = `📅 វេនយកឧបករណ៍ស្លាយថ្ងៃនេះ៖\n១. ${todayDuty.p1.name}\n២. ${todayDuty.p2.name}\n🚨 វេនបម្រុង៖ ${todayDuty.backup.name}`;
    navigator.clipboard.writeText(text);
    alert('📋 ចម្លងព័ត៌មានរួចរាល់!');
  };

  // ✅ ប្រព័ន្ធគ្រប់គ្រងការបាញ់សារទៅកាន់ Telegram
  const sendTelegramAlert = async (type: string, p1: Student, p2: Student, backup: Student) => {
    const BOT_TOKEN = '8880912035:AAHZIZPcZCLpPhX8PxYuebTqGIigCXciyGY';
    const CHAT_ID = '-1003502505377';
    
    const m1 = p1.telegram_username ? `@${p1.telegram_username.replace(/_/g, '\\_')}` : p1.name;
    const m2 = p2.telegram_username ? `@${p2.telegram_username.replace(/_/g, '\\_')}` : p2.name;
    const mB = backup.telegram_username ? `@${backup.telegram_username.replace(/_/g, '\\_')}` : backup.name;

    let text = '';
    if (type === 'remind') {
      text = `📢 *[សេចក្តីរំលឹកអំពីកាតព្វកិច្ចយកស្លាយ]*\n\nសូមជម្រាបជូនមិត្តភក្តិដែលដល់វេន៖\n1. *${p1.name}* (${m1})\n2. *${p2.name}* (${m2})\n\nសូមមេត្តាជួយទៅយកឧបករណ៍ស្លាយដំឡើងក្នុងថ្នាក់ឱ្យបានមុនម៉ោង *12:30 PM*។ សូមអរគុណសម្រាប់កិច្ចសហការ! 🙏✨`;
    } else if (type === 'swap') {
      text = `🔄 *[សេចក្តីជូនដំណឹងអំពីការដូរវេន]*\n\nមិត្តភក្តិ *${p1.name}* បានដោះដូរភារកិច្ចជាមួយមិត្តភក្តិ *${p2.name}* រួចរាល់នៅលើប្រព័ន្ធ Web! 🙏`;
    } else if (type === 'backup') {
      text = `⚠️ *[សេចក្តីជូនដំណឹងជូនសមាជិកបម្រុង]*\n\nសូមគោរពអញ្ជើញមិត្តភក្តិវេនបម្រុងទុក៖\n👤 *${backup.name}* (${mB})\n\nមេត្តាជួយទៅរៀបចំឧបករណ៍ស្លាយជំនួសក្នុងថ្នាក់រៀនបន្តិចបាទ។ សូមអរគុណច្រើន! 🙏⚡`;
    } else if (type === 'done') {
      text = `✅ *[របាយការណ៍បញ្ចប់ភារកិច្ច]*\n\nឧបករណ៍ស្លាយត្រូវបានរៀបចំ និងដំឡើងដោយមិត្តភក្តិ *${p1.name}* និង *${p2.name}* រួចរាល់ជាស្ថាពរហើយ។ អរគុណមិត្តភក្តិទាំងពីរខ្លាំងណាស់! 🎓🚀`;
    } else if (type === 'leave') {
      text = `📅 *[សេចក្តីជូនដំណឹងអំពីការសុំច្បាប់]*\n\nមិត្តភក្តិ *${p1.name}* បានដាក់ពាក្យសុំច្បាប់សម្រាក/រវល់។\n\nដូច្នេះភារកិច្ចចម្បងនឹងត្រូវផ្ទេរជូនសមាជិកបម្រុង (Backup) ស្វ័យប្រវត្ត៖\n👤 *${backup.name}* (${mB}) សូមមេត្តាជួយរៀបចំជំនួសក្នុងថ្នាក់។ អរគុណច្រើន! 🙏`;
    }

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
      });
      alert('🚀 ផ្ញើសារទៅកាន់គ្រុប Telegram រួចរាល់!');
    } catch (err) {
      alert('❌ 有问题系统!');
    }
  };

  const todayDuty = schedule.find((s) => s.isToday);
  const filteredSchedule = schedule.filter(item => 
    item.p1.name.includes(searchQuery) || item.p2.name.includes(searchQuery) || item.dateString.includes(searchQuery)
  );

  return (
    <>
      {/* RUPP LOGO NEON LOADING SCREEN */}
      {isLoading && (
        <div className="fixed inset-0 bg-[#02050c] z-[9999] flex flex-col items-center justify-center transition-all duration-500">
          <div className="relative flex items-center justify-center w-36 h-36">
            <div className="absolute inset-0 border-4 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-1.5 border-2 border-t-transparent border-r-emerald-400 border-b-transparent border-l-emerald-400 rounded-full animate-spin [animation-duration:1.5s] opacity-70"></div>
            <img 
              src="https://upload.wikimedia.org/wikipedia/km/e/ee/Rupp_logo.png" 
              alt="RUPP LOGO LOADING" 
              className="w-24 h-24 rounded-full p-2 bg-white object-contain shadow-2xl shadow-purple-500/20"
            />
          </div>
          <p className="text-xs text-purple-400 font-bold tracking-widest mt-6 animate-pulse uppercase">ITE A3 • System Booting...</p>
        </div>
      )}

      {/* MAIN WEBSITE PORTAL */}
      <main className="min-h-screen bg-[#030712] bg-gradient-to-b from-[#030712] via-[#090514] to-[#020617] text-slate-100 pb-16 relative antialiased overflow-x-hidden">
        
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* NAVIGATION BAR */}
        <div className="bg-[#0b0f19]/80 backdrop-blur-xl border-b border-white/[0.04] sticky top-0 z-50 py-3.5 shadow-xl">
          <div className="max-w-md mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="https://upload.wikimedia.org/wikipedia/km/e/ee/Rupp_logo.png" alt="RUPP" className="w-8 h-8 rounded-full border border-white/20 p-0.5 bg-white shadow-md" />
              <div>
                <h1 className="text-xs font-black tracking-widest text-slate-100 uppercase">ITE A3 • SLIDE PORTAL</h1>
                <p className="text-[10px] text-emerald-400 font-medium mt-0.5">{currentDateText}</p>
              </div>
            </div>
            
            {notificationPermission !== 'granted' && (
              <button onClick={requestNotificationPermission} className="text-[9px] font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 px-3 py-1.5 rounded-lg transition-all shadow-lg shadow-emerald-500/10">
                🔔 បើកការរំលឹក
              </button>
            )}
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 mt-6 space-y-5">
          
          {/* CONTROL CENTER */}
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setShowSwapModal(true)} className="bg-[#0f1524]/60 border border-white/[0.05] hover:border-white/10 p-3.5 rounded-2xl text-xs font-semibold text-slate-300 flex items-center justify-center gap-2 transition-all hover:bg-[#131b2e]/80">
              🔄 ស្នើសុំប្ដូរវេនរហ័ស
            </button>
            <button onClick={() => setShowLeaveModal(true)} className="bg-[#0f1524]/60 border border-white/[0.05] hover:border-white/10 p-3.5 rounded-2xl text-xs font-semibold text-slate-300 flex items-center justify-center gap-2 transition-all hover:bg-[#131b2e]/80">
              📅 ដាក់ពាក្យសុំច្បាប់
            </button>
          </div>

          {/* ACTIVE DUTY CARD */}
          <div className={`border rounded-3xl p-6 shadow-2xl relative overflow-hidden transition-all duration-500 bg-[#0b0f19]/60 backdrop-blur-xl ${isDutyDone ? 'border-emerald-500/20 shadow-emerald-950/10' : 'border-white/[0.05]'}`}>
            {isWeekend || !todayDuty ? (
              <div className="py-12 text-center">
                <span className="text-4xl block mb-2 opacity-60">💤</span>
                <h2 className="text-xs font-medium text-slate-400">ថ្ងៃនេះមិនមានវេនយកឧបករណ៍ស្លាយទេ</h2>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold px-3 py-1 rounded-md tracking-wider ${isDutyDone ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                      {isDutyDone ? '✓ រួចរាល់ហើយ' : 'ACTIVE DUTY'}
                    </span>
                    <button onClick={copyToClipboard} className="p-1.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] rounded-lg text-[10px] text-slate-400 transition-all">📋</button>
                  </div>
                  <span className="text-[10px] font-mono font-medium text-slate-400 bg-black/40 px-3 py-1 rounded-full border border-white/[0.03]">⏱ {countdownText}</span>
                </div>

                {/* DUTY MEMBERS DISPLAY */}
                <div className="grid grid-cols-2 gap-3.5 mb-4">
                  <div className="bg-[#070a12]/80 border border-white/[0.03] p-4 rounded-2xl text-center shadow-inner">
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Primary 01</p>
                    <h3 className="text-sm font-semibold text-white mt-1.5">{todayDuty.p1.name}</h3>
                    <p className="text-[10px] text-emerald-500/70 font-mono mt-0.5">@{todayDuty.p1.telegram_username || 'no_id'}</p>
                  </div>
                  <div className="bg-[#070a12]/80 border border-white/[0.03] p-4 rounded-2xl text-center shadow-inner">
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Primary 02</p>
                    <h3 className="text-sm font-semibold text-white mt-1.5">{todayDuty.p2.name}</h3>
                    <p className="text-[10px] text-emerald-500/70 font-mono mt-0.5">@{todayDuty.p2.telegram_username || 'no_id'}</p>
                  </div>
                </div>

                {/* BACKUP BOX */}
                <div className="bg-red-500/[0.03] border border-red-500/10 px-4 py-2.5 rounded-xl flex justify-between items-center mb-6 text-xs">
                  <span className="text-[9px] font-bold text-red-400/80 uppercase tracking-widest">🚨 វេនបម្រុង (Backup):</span>
                  <span className="font-semibold text-red-200">{todayDuty.backup.name}</span>
                </div>

                {/* SYSTEM BUTTONS */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button onClick={() => sendTelegramAlert('remind', todayDuty.p1, todayDuty.p2, todayDuty.backup)} className="bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 font-medium py-2.5 rounded-xl text-xs transition-all active:scale-[0.98]">🔔 ផ្ញើរំលឹកវេន</button>
                  <button onClick={handleMarkAsDone} disabled={isDutyDone} className={`font-bold py-2.5 rounded-xl text-xs transition-all active:scale-[0.98] ${isDutyDone ? 'bg-emerald-950/20 text-emerald-500/40 border border-emerald-500/10 cursor-not-allowed' : 'bg-slate-100 text-slate-950 hover:bg-white'}`}>
                    {isDutyDone ? '✓ រួចរាល់ជាស្ថាពរ' : '✅ ដល់ថ្នាក់រៀនហើយ'}
                  </button>
                  <button onClick={() => sendTelegramAlert('swap', todayDuty.p1, todayDuty.p2, todayDuty.backup)} className="bg-amber-500/5 hover:bg-amber-500/10 text-amber-400 border border-amber-500/15 font-medium py-2.5 rounded-xl text-xs transition-all active:scale-[0.98]">🔄 ផ្ញើសារសុំដូរវេន</button>
                  <button onClick={() => sendTelegramAlert('backup', todayDuty.p1, todayDuty.p2, todayDuty.backup)} className="bg-red-500/5 hover:bg-red-500/10 text-red-400 border border-red-500/15 font-medium py-2.5 rounded-xl text-xs transition-all active:scale-[0.98]">🚨 ហៅអ្នក Backup</button>
                </div>
              </>
            )}
          </div>

          {/* SEARCH BOX */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500 text-xs">🔍</span>
            <input 
              type="text" 
              placeholder="ស្វែងរកឈ្មោះសមាជិក ឬថ្ងៃខែ..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0e17]/80 border border-white/[0.04] rounded-2xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/30 transition-all backdrop-blur-md"
            />
          </div>

          {/* SCHEDULE LIST */}
          <div className="bg-[#0b0f19]/60 backdrop-blur-xl border border-white/[0.04] rounded-3xl p-5 shadow-2xl">
            <h3 className="text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-widest opacity-80">📅 កាលវិភាគវិលជុំប្រចាំថ្ងៃ</h3>
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 text-xs scrollbar-thin scrollbar-thumb-white/5">
              {filteredSchedule.map((item, idx) => (
                <div key={idx} className={`p-3 rounded-xl border transition-all ${item.isToday ? 'bg-purple-500/[0.05] border-purple-500/30' : 'bg-black/20 border-white/[0.02]'}`}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className={`font-medium text-[11px] ${item.isToday ? 'text-purple-300 font-bold' : 'text-slate-400'}`}>{item.dateString}</span>
                    {item.isToday && <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">TODAY</span>}
                  </div>
                  <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                    <div className="flex items-center gap-1">👤 <span className="text-slate-200">{item.p1.name}</span></div>
                    <div className="flex items-center gap-1">👤 <span className="text-slate-200">{item.p2.name}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* SWAP MODAL */}
        {showSwapModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0b0f19] border border-white/10 rounded-3xl p-6 w-full max-w-sm text-xs shadow-2xl">
              <h3 className="text-sm font-bold text-white mb-2">🔄 ជ្រើសរើសមិត្តភក្តិដើម្បីប្ដូរវេន</h3>
              <p className="text-slate-400 mb-4">ប្រព័ន្ធនឹងធ្វើការប្ដូរវេនរបស់ {todayDuty?.p1.name} ទៅឱ្យសមាជិកដែលជ្រើសរើស៖</p>
              <select value={swapTargetId} onChange={(e) => setSwapTargetId(e.target.value)} className="w-full bg-[#030712] border border-white/10 rounded-xl p-3 text-white mb-5 focus:outline-none">
                <option value="">-- សូមជ្រើសរើសឈ្មោះ --</option>
                {STUDENT_LIST.filter(s => s.id !== todayDuty?.p1.id && s.id !== todayDuty?.p2.id).map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button onClick={() => setShowSwapModal(false)} className="w-full bg-white/5 py-2.5 rounded-xl font-medium">បោះបង់</button>
                <button onClick={handleSwapDuty} className="w-full bg-emerald-500 text-slate-950 py-2.5 rounded-xl font-bold hover:bg-emerald-400">យល់ព្រមដូរ</button>
              </div>
            </div>
          </div>
        )}

        {/* LEAVE MODAL */}
        {showLeaveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0b0f19] border border-white/10 rounded-3xl p-6 w-full max-w-sm text-xs shadow-2xl">
              <h3 className="text-sm font-bold text-white mb-2">📅 ដាក់ពាក្យសុំច្បាប់រវល់ទុកមុន</h3>
              <p className="text-slate-400 mb-4">សូមរើសថ្ងៃខែដែលដឹងថារវល់ ប្រព័ន្ធនឹងរុញវេន Backup ឱ្យមកធ្វើការជំនួសដោយស្វ័យប្រវត្ត៖</p>
              <input type="date" value={leaveDate} onChange={(e) => setLeaveDate(e.target.value)} className="w-full bg-[#030712] border border-white/10 rounded-xl p-3 text-white mb-5 focus:outline-none" />
              <div className="flex gap-2">
                <button onClick={() => setShowLeaveModal(false)} className="w-full bg-white/5 py-2.5 rounded-xl font-medium">បោះបង់</button>
                <button onClick={handleRequestLeave} className="w-full bg-emerald-500 text-slate-950 py-2.5 rounded-xl font-bold hover:bg-emerald-400">យល់ព្រម</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </>
  );
}