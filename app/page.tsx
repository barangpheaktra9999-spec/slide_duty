'use client';

import { useEffect, useState } from 'react';

// ==========================================
// ១. បញ្ជីឈ្មោះនិស្សិត ITE A3 ទាំង ៤០ នាក់
// ==========================================
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

// ==========================================
// ២. បែងចែកគូទាំង ២០ រាប់ត្រឡប់ពីក្រោយមកមុខ (Fixed Array Structure)
// ==========================================
const DUTY_PAIRS = [
  { pairId: 1, dayName: "ថ្ងៃចន្ទ (Monday)", p1: STUDENT_LIST[38], p2: STUDENT_LIST[37] },
  { pairId: 2, dayName: "ថ្ងៃអង្គារ (Tuesday)", p1: STUDENT_LIST[36], p2: STUDENT_LIST[35] },
  { pairId: 3, dayName: "ថ្ងៃពុធ (Wednesday)", p1: STUDENT_LIST[34], p2: STUDENT_LIST[33] },
  { pairId: 4, dayName: "ថ្ងៃព្រហស្បតិ៍ (Thursday)", p1: STUDENT_LIST[32], p2: STUDENT_LIST[31] },
  { pairId: 5, dayName: "ថ្ងៃសុក្រ (Friday)", p1: STUDENT_LIST[30], p2: STUDENT_LIST[29] },
  { pairId: 6, dayName: "ថ្ងៃចន្ទ (Monday)", p1: STUDENT_LIST[28], p2: STUDENT_LIST[27] },
  { pairId: 7, dayName: "ថ្ងៃអង្គារ (Tuesday)", p1: STUDENT_LIST[26], p2: STUDENT_LIST[25] },
  { pairId: 8, dayName: "ថ្ងៃពុធ (Wednesday)", p1: STUDENT_LIST[24], p2: STUDENT_LIST[23] },
  { pairId: 9, dayName: "ថ្ងៃព្រហស្បតិ៍ (Thursday)", p1: STUDENT_LIST[22], p2: STUDENT_LIST[21] },
  { pairId: 10, dayName: "ថ្ងៃសុក្រ (Friday)", p1: STUDENT_LIST[20], p2: STUDENT_LIST[19] },
  { pairId: 11, dayName: "ថ្ងៃចន្ទ (Monday)", p1: STUDENT_LIST[18], p2: STUDENT_LIST[17] },
  { pairId: 12, dayName: "ថ្ងៃអង្គារ (Tuesday)", p1: STUDENT_LIST[16], p2: STUDENT_LIST[15] },
  { pairId: 13, dayName: "ថ្ងៃពុធ (Wednesday)", p1: STUDENT_LIST[14], p2: STUDENT_LIST[13] },
  { pairId: 14, dayName: "ថ្ងៃព្រហស្បតិ៍ (Thursday)", p1: STUDENT_LIST[11], p2: STUDENT_LIST[10] },
  { pairId: 15, dayName: "ថ្ងៃសុក្រ (Friday)", p1: STUDENT_LIST[10], p2: STUDENT_LIST[9] },
  { pairId: 16, dayName: "ថ្ងៃចន្ទ (Monday)", p1: STUDENT_LIST[9], p2: STUDENT_LIST[8] }, 
  { pairId: 17, dayName: "ថ្ងៃអង្គារ (Tuesday)", p1: STUDENT_LIST[7], p2: STUDENT_LIST[6] }, 
  { pairId: 18, dayName: "ថ្ងៃពុធ (Wednesday)", p1: STUDENT_LIST[5], p2: STUDENT_LIST[4] }, 
  { pairId: 19, dayName: "ថ្ងៃព្រហស្បតិ៍ (Thursday)", p1: STUDENT_LIST[3], p2: STUDENT_LIST[2] }, 
  { pairId: 20, dayName: "ថ្ងៃសុក្រ (Friday)", p1: STUDENT_LIST[1], p2: STUDENT_LIST[0] }
];

export default function Home() {
  const [appLoading, setAppLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [countdownText, setCountdownText] = useState('00h 00m 00s');
  const [currentDateText, setCurrentDateText] = useState('');
  const [isWeekend, setIsWeekend] = useState(false);
  const [todayDuty, setTodayDuty] = useState<any>(null);

  // States សម្រាប់មុខងារសុំដូរវេន (Swap Duty)
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swappingStudent, setSwappingStudent] = useState<any>(null);
  const [targetPairId, setTargetPairId] = useState<string>('');
  const [swapLoading, setSwapLoading] = useState(false);

  // Array បញ្ជីឈ្មោះសម្រាប់បង្ហាញក្នុងតារាង ១ សប្តាហ៍ (ចន្ទ - សុក្រ)
  const [weeklySchedule, setWeeklySchedule] = useState<any[]>([]);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setAppLoading(false);
      setShowWelcome(true);
    }, 2000);

    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDateText(today.toLocaleDateString('km-KH', options));

    // កំណត់វេនថ្ងៃនេះ
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setIsWeekend(true);
      setTodayDuty(null);
    } else {
      setIsWeekend(false);
      setTodayDuty(DUTY_PAIRS[dayOfWeek - 1] || DUTY_PAIRS[0]);
    }

    // ==========================================
    // 📅 គណនាតារាងបញ្ជីឈ្មោះវេនប្រចាំសប្តាហ៍នេះ (៥ ថ្ងៃ៖ ចន្ទ - សុក្រ)
    // ==========================================
    const scheduleForWeek = [
      { dayLabel: "ថ្ងៃចន្ទ (Mon)", pair: DUTY_PAIRS[0] },
      { dayLabel: "ថ្ងៃអង្គារ (Tue)", pair: DUTY_PAIRS[1] },
      { dayLabel: "ថ្ងៃពុធ (Wed)", pair: DUTY_PAIRS[2] },
      { dayLabel: "ថ្ងៃព្រហស្បតិ៍ (Thu)", pair: DUTY_PAIRS[3] },
      { dayLabel: "ថ្ងៃសុក្រ (Fri)", pair: DUTY_PAIRS[4] },
    ];
    setWeeklySchedule(scheduleForWeek);

    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (isWeekend) {
      setCountdownText("ថ្ងៃសម្រាកចុងសប្ដាហ៍");
      return;
    }

    const timer = setInterval(() => {
      const now = new Date();
      const target = new Date();
      target.setHours(12, 30, 0, 0);

      let diff = target.getTime() - now.getTime();
      if (diff < 0) {
        target.setDate(target.getDate() + 1);
        diff = target.getTime() - now.getTime();
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdownText(
        `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [isWeekend]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStudents([]);
    } else {
      const query = searchQuery.toLowerCase();
      
      const results = STUDENT_LIST.filter(student =>
        student.name.toLowerCase().includes(query) ||
        student.id.toString().includes(query) ||
        student.telegram_username.toLowerCase().includes(query)
      ).map(student => {
        const dutySchedule = DUTY_PAIRS.find(pair => pair.p1.id === student.id || pair.p2.id === student.id);
        
        let scheduleInfo = "មានឈ្មោះក្នុងប្រព័ន្ធ";
        let partnerName = "គ្មានដៃគូ";
        let currentPairId = null;

        if (dutySchedule) {
          scheduleInfo = dutySchedule.dayName;
          partnerName = dutySchedule.p1.id === student.id ? dutySchedule.p2.name : dutySchedule.p1.name;
          currentPairId = dutySchedule.pairId;
        }

        return {
          ...student,
          dutyDay: scheduleInfo,
          partner: partnerName,
          pairId: currentPairId
        };
      });

      setFilteredStudents(results);
    }
  }, [searchQuery]);

  const handleRequestSwap = async () => {
    if (!targetPairId || !swappingStudent) return;
    setSwapLoading(true);

    const selectedPair = DUTY_PAIRS.find(p => p.pairId === parseInt(targetPairId));
    if (!selectedPair) return;

    try {
      const BOT_TOKEN = "8880912035:AAHZIZPcZCLpPhX8PxYuebTqGIigCXciyGY"; 
      const CHAT_ID = "-1003502505377"; 

      const message = `🔄 *សេចក្តីជូនដំណឹង៖ ការសុំប្តូរវេនគ្នា* 🔄\n\n📢 និស្សិតឈ្មោះ *${swappingStudent.name}* (@${swappingStudent.telegram_username}) ដែលត្រូវវេននៅថ្ងៃ *${swappingStudent.dutyDay}* មានធុរៈរវល់ ហើយបានស្នើសុំដូរវេនយកស្លាយមេរៀនជាមួយ៖\n\n🤝 *ក្រុមគោលដៅ:* \n១. ${selectedPair.p1.name}\n២. ${selectedPair.p2.name}\n(ត្រូវវេនធម្មតានៅ៖ *${selectedPair.dayName}*)\n\n👉 សូមក្រុមទាំងពីរទាក់ទងគ្នាដើម្បីសម្របសម្រួល និងទៅយកស្លាយជំនួសគ្នាផងបាទ! (កាលវិភាគក្នុងប្រព័ន្ធ Array រក្សាដដែល)`;

      const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' }),
      });

      alert("🚀 បានផ្ញើសារសុំដូរវេនទៅកាន់គ្រុប Telegram រួចរាល់ហើយ!");
      setShowSwapModal(false);
    } catch (error) {
      console.error(error);
      alert("មានបញ្ហា មិនអាចផ្ញើសារបានទេ!");
    } finally {
      setSwapLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!todayDuty) return;
    setCheckInLoading(true);
    try {
      const BOT_TOKEN = "8880912035:AAHZIZPcZCLpPhX8PxYuebTqGIigCXciyGY"; 
      const CHAT_ID = "-1003502505377"; 

      const message = `🔔 *ការបញ្ជាក់វត្តមានទៅយកស្លាយ* 🔔\n\n📅 *កាលបរិច្ឆេទ:* ${currentDateText || 'ថ្ងៃនេះ'}\n📢 គូមានវេនថ្ងៃនេះបានចុច *Check-in* ទៅយកស្លាយមេរៀនមកថ្នាក់រៀនហើយ!\n\n👤 *សមាជិកទី ០១:* ${todayDuty.p1.name}\n👤 *សមាជិកទី ០២:* ${todayDuty.p2.name}\n\nសូមសមាជិកក្នុងថ្នាក់រង់ចាំបន្តិចបាទ! 📚✨`;

      const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' }),
      });
      setIsCheckedIn(true);
    } catch (error) {
      console.error(error);
      setIsCheckedIn(true);
    } finally {
      setCheckInLoading(false);
    }
  };

  if (appLoading) {
    return (
      <div className="min-h-screen bg-[#02040a] flex flex-col items-center justify-center text-slate-100 antialiased">
        <div className="flex flex-col items-center gap-4">
          <img src="https://www.rupp.edu.kh/assets/logo.svg" alt="RUPP" className="w-16 h-16 animate-pulse bg-white/5 p-2 rounded-2xl" />
          <div className="h-1 w-32 bg-white/10 rounded-full overflow-hidden relative">
            <div className="h-full w-1/2 bg-emerald-500 rounded-full absolute top-0 animate-[loading_1s_ease-in-out_infinite]"></div>
          </div>
          <p className="text-xs font-mono text-emerald-400 tracking-widest uppercase animate-pulse">Loading Slide Portal...</p>
        </div>
        <style jsx global>{`
          @keyframes loading {
            0% { left: -50%; }
            100% { left: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#02040a] text-slate-100 flex flex-col antialiased">
      
      {/* NAVBAR */}
      <nav className="w-full border-b border-white/[0.08] bg-[#070a12]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="https://www.rupp.edu.kh/assets/logo.svg" alt="RUPP Logo" className="w-9 h-9 object-contain bg-white/5 p-1 rounded-lg" />
          <div className="flex flex-col">
            <span className="font-bold text-xs tracking-wider text-slate-200">RUPP ITE A3</span>
            <span className="text-[9px] text-emerald-400 font-mono tracking-widest">SLIDE PORTAL</span>
          </div>
        </div>
        <div className="text-[11px] font-mono bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/[0.08] text-slate-400">
          📅 ចន្ទ - សុក្រ (12:30 PM)
        </div>
      </nav>

      {/* BODY */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-xl mx-auto w-full space-y-5">
        
        <div className="w-full text-center">
          <p className="text-xs text-slate-400 font-medium font-mono">📅 {currentDateText}</p>
        </div>

        {/* 🕒 ម៉ោងរាប់ថយក្រោយ */}
        <div className="w-full bg-[#0b0f19] border border-white/[0.06] rounded-2xl p-4 text-center shadow-xl">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">⏳ ម៉ោងរាប់ថយក្រោយទៅយកស្លាយ</p>
          <p className={`text-2xl font-black font-mono tracking-wider ${isWeekend ? 'text-slate-500' : 'text-amber-400'}`}>{countdownText}</p>
        </div>

        {/* 🔍 SEARCH BAR */}
        <div className="w-full bg-[#0b0f19] border border-white/[0.06] rounded-2xl p-4 shadow-xl">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">🔎 ពិនិត្យមើលថ្ងៃត្រូវវេនរបស់អ្នក (ស្វែងរកឈ្មោះ)</label>
          <div className="relative">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="វាយឈ្មោះខ្មែរ ឬ អង់គ្លេស..."
              className="w-full bg-[#030712] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 text-xs">✕</button>
            )}
          </div>

          {searchQuery && (
            <div className="mt-3 max-h-64 overflow-y-auto space-y-2 border-t border-white/[0.04] pt-2">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <div key={student.id} className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-xl flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-200">{student.name} (ID: {student.id})</span>
                      <span className="text-[10px] text-slate-500 font-mono">@{student.telegram_username}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-white/[0.02] p-2 rounded-lg border border-white/[0.02]">
                      <div>
                        <span className="text-slate-500 block">📅 ថ្ងៃត្រូវវេន៖</span>
                        <span className="text-amber-400 font-medium">{student.dutyDay}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">🤝 ត្រូវជាមួយគូឈ្មោះ៖</span>
                        <span className="text-emerald-400 font-medium">{student.partner}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setSwappingStudent(student);
                        setShowSwapModal(true);
                      }}
                      className="w-full py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-[10px] font-bold rounded-lg border border-blue-500/20 transition-all"
                    >
                      🔄 ស្នើសុំដូរវេនជាមួយក្រុមផ្សេង
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-[11px] text-slate-500 py-2">រកមិនឃើញឈ្មោះនិស្សិតនេះទេ</p>
              )}
            </div>
          )}
        </div>

        {/* 📢 ACTIVE DUTY CARD */}
        <div className="w-full bg-[#0b0f19] border border-white/[0.06] rounded-2xl p-6 shadow-xl">
          {isWeekend ? (
            <div className="text-center py-6">
              <span className="text-3xl">🏝️</span>
              <h3 className="text-sm font-bold text-slate-300 mt-2">ថ្ងៃនេះជាថ្ងៃសម្រាកចុងសប្ដាហ៍!</h3>
              <p className="text-[11px] text-slate-500 mt-1">គ្មានវេនសម្រាប់ទៅយកស្លាយមេរៀនទេ ប៊ូតុងត្រូវបានបិទ។</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">📢 គូមានវេនទៅយកស្លាយថ្ងៃនេះ</h2>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">១ វេន ២ នាក់</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 bg-white/[0.02] rounded-xl border border-white/[0.04] text-center">
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">សមាជិកទី ០១</p>
                  <p className="text-sm font-semibold text-slate-200 mt-1">{todayDuty?.p1.name}</p>
                </div>
                <div className="p-3 bg-white/[0.02] rounded-xl border border-white/[0.04] text-center">
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">សមាជិកទី ០២</p>
                  <p className="text-sm font-semibold text-slate-200 mt-1">{todayDuty?.p2.name}</p>
                </div>
              </div>

              <button
                onClick={handleCheckIn}
                disabled={isCheckedIn || checkInLoading}
                className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  isCheckedIn 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-emerald-500 hover:bg-emerald-600 text-slate-900 shadow-lg'
                }`}
              >
                {checkInLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>កំពុងបញ្ជាក់វត្តមាន...</span>
                  </>
                ) : isCheckedIn ? (
                  '✓ បានរាយការណ៍វត្តមាន និងផ្ញើសាររួចរាល់'
                ) : (
                  '✓ ចុច Check-in ពេលទៅយកស្លាយ'
                )}
              </button>
            </>
          )}
        </div>

        {/* 📅 📊 មុខងារថ្មី៖ តារាងបង្ហាញអ្នកត្រូវទៅយកមុន ១ សប្តាហ៍ (Upcoming Week Schedule) */}
        <div className="w-full bg-[#0b0f19] border border-white/[0.06] rounded-2xl p-5 shadow-xl">
          <div className="flex justify-between items-center mb-3 border-b border-white/[0.04] pb-2">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              📅 កាលវិភាគអ្នកត្រូវទៅយកស្លាយប្រចាំសប្តាហ៍នេះ
            </h3>
            <span className="text-[9px] text-slate-500 font-mono">NEXT 5 DAYS</span>
          </div>

          <div className="space-y-2">
            {weeklySchedule.map((item, index) => (
              <div 
                key={index} 
                className={`p-2.5 rounded-xl border flex justify-between items-center text-[11px] transition-all ${
                  !isWeekend && todayDuty?.pairId === item.pair.pairId
                    ? 'bg-emerald-500/[0.04] border-emerald-500/30' 
                    : 'bg-white/[0.01] border-white/[0.04]'
                }`}
              >
                <div className="flex flex-col">
                  <span className={`font-bold ${!isWeekend && todayDuty?.pairId === item.pair.pairId ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {item.dayLabel}
                  </span>
                  {!isWeekend && todayDuty?.pairId === item.pair.pairId && (
                    <span className="text-[9px] text-emerald-500 font-medium font-mono animate-pulse">● វេនថ្ងៃនេះ</span>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-200">{item.pair.p1.name} 🤝 {item.pair.p2.name}</p>
                  <p className="text-[9px] text-slate-500 font-mono">គូទី {item.pair.pairId}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 🔄 POP-UP SWAP MODAL */}
      {showSwapModal && swappingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-white/10 rounded-2xl p-5 w-full max-w-sm text-xs shadow-2xl">
            <h3 className="text-sm font-bold text-white mb-2">🔄 ផ្ញើសារស្នើសុំដូរវេនគ្នា</h3>
            <p className="text-slate-400 mb-4">តើអ្នកចង់ស្នើសុំដូរវេនរបស់ <strong className="text-white">{swappingStudent.name}</strong> ជាមួយក្រុមណាខ្លះ?</p>
            
            <label className="block text-[10px] text-slate-400 mb-1 uppercase font-bold tracking-wider">សូមជ្រើសរើសក្រុមគោលដៅ៖</label>
            <select 
              value={targetPairId}
              onChange={(e) => setTargetPairId(e.target.value)}
              className="w-full bg-[#030712] border border-white/10 rounded-xl p-3 text-white mb-5 focus:outline-none focus:border-blue-500/50"
            >
              <option value="">-- ជ្រើសរើសក្រុម និងថ្ងៃ --</option>
              {DUTY_PAIRS.filter(p => p.pairId !== swappingStudent.pairId).map(pair => (
                <option key={pair.pairId} value={pair.pairId}>
                  {pair.dayName} - {pair.p1.name} & {pair.p2.name}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <button onClick={() => setShowSwapModal(false)} className="w-full bg-white/5 py-2.5 rounded-xl font-medium text-slate-300 hover:bg-white/10 transition-all">បោះបង់</button>
              <button 
                onClick={handleRequestSwap}
                disabled={!targetPairId || swapLoading}
                className="w-full bg-blue-500 disabled:bg-blue-800 disabled:text-slate-400 text-slate-950 py-2.5 rounded-xl font-bold hover:bg-blue-400 transition-all flex items-center justify-center"
              >
                {swapLoading ? 'កំពុងផ្ញើសារ...' : '🚀 ផ្ញើសារជូនដំណឹង'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 👋 POP-UP ស្វាគមន៍ */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-[#0b0f19] border border-white/10 rounded-2xl p-6 w-full max-w-md text-xs shadow-2xl relative">
            <div className="text-center mb-4">
              <img src="https://www.rupp.edu.kh/assets/logo.svg" alt="RUPP" className="w-12 h-12 mx-auto bg-white/5 p-1 rounded-xl mb-2" />
              <h3 className="text-sm font-bold text-white">👋 ស្វាគមន៍មកកាន់ Slide Portal (ITE A3)</h3>
              <p className="text-slate-400 text-[11px] mt-1">ប្រព័ន្ធបែងចែកវេនគូស្វ័យប្រវត្ត ដើម្បីទៅយកស្លាយមេរៀន</p>
            </div>

            <div className="space-y-3 my-4 bg-white/[0.02] p-3 rounded-xl border border-white/[0.04]">
              <h4 className="font-bold text-emerald-400 text-[11px] uppercase tracking-wider">🚀 មុខងារពិសេសៗរបស់កម្មវិធី៖</h4>
              <div className="flex gap-2"><span>👥</span><p className="text-slate-300"><strong className="text-white">បែងចែកវេនជាគូ៖</strong> និស្សិតប្តូរវេនគ្នាទៅយកស្លាយមកថ្នាក់រៀន ១ វេនមាន ២ នាក់ជាគូៗ រាប់ត្រឡប់ពីក្រោយមកមុខវិញ។</p></div>
              <div className="flex gap-2"><span>📅</span><p className="text-slate-300"><strong className="text-white">កាលវិភាគប្រចាំសប្តាហ៍៖</strong> បង្ហាញតារាងបញ្ជីឈ្មោះគូត្រូវវេនសម្រាប់រៀនត្រៀមខ្លួនទុកមុន ១ សប្តាហ៍យ៉ាងច្បាស់លាស់។</p></div>
              <div className="flex gap-2"><span>🔎</span><p className="text-slate-300"><strong className="text-white">ស្វែងរកឆ្លាតវៃ៖</strong> អាចវាយស្វែងរកឈ្មោះខ្លួនឯងដើម្បីដឹងថាត្រូវវេននៅថ្ងៃណា និងត្រូវជាមួយនរណាបានភ្លាមៗ (ខ្មែរ & អង់គ្លេស)។</p></div>
              <div className="flex gap-2"><span>🔄</span><p className="text-slate-300"><strong className="text-white">ប្រព័ន្ធសុំដូរវេន៖</strong> អាចផ្ញើសារប្រកាសអាសន្នសុំដូរវេនទៅកាន់ Telegram ក្រុមគោលដៅដោយមិនរំកិល Array កាលវិភាគឡើយ。</p></div>
            </div>

            <button onClick={() => setShowWelcome(false)} className="w-full mt-2 bg-emerald-500 text-slate-950 py-2.5 rounded-xl font-bold hover:bg-emerald-400 shadow-lg transition-all">
              🚀 ចាប់ផ្តើមប្រើប្រាស់កម្មវិធី
            </button>
          </div>
        </div>
      )}

    </main>
  );
}