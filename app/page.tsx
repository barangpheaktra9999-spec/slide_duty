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
  { id: 15, name: "ប៊ុណ្ណា ដាវីដ", telegram_username: "bunna_david"},
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

const DUTY_PAIRS = [
  { pairId: 1, dayName: "ថ្ងៃចន្ទ (Monday)", p1: STUDENT_LIST[27], p2: STUDENT_LIST[8] },
  { pairId: 2, dayName: "ថ្ងៃអង្គារ (Tuesday)", p1: STUDENT_LIST[9], p2: STUDENT_LIST[10] },
  { pairId: 3, dayName: "ថ្ងៃពុធ (Wednesday)", p1: STUDENT_LIST[11], p2: STUDENT_LIST[12] },
  { pairId: 4, dayName: "ថ្ងៃព្រហស្បតិ៍ (Thursday)", p1: STUDENT_LIST[13], p2: STUDENT_LIST[14] },
  { pairId: 5, dayName: "ថ្ងៃសុក្រ (Friday)", p1: STUDENT_LIST[22], p2: STUDENT_LIST[16] },
  { pairId: 6, dayName: "ថ្ងៃចន្ទ (Monday)", p1: STUDENT_LIST[17], p2: STUDENT_LIST[18] },
  { pairId: 7, dayName: "ថ្ងៃអង្គារ (Tuesday)", p1: STUDENT_LIST[19], p2: STUDENT_LIST[20] },
  { pairId: 8, dayName: "ថ្ងៃពុធ (Wednesday)", p1: STUDENT_LIST[21], p2: STUDENT_LIST[15] },
  { pairId: 9, dayName: "ថ្ងៃព្រហស្បតិ៍ (Thursday)", p1: STUDENT_LIST[23], p2: STUDENT_LIST[24] },
  { pairId: 10, dayName: "ថ្ងៃសុក្រ (Friday)", p1: STUDENT_LIST[25], p2: STUDENT_LIST[26] },
  { pairId: 11, dayName: "ថ្ងៃចន្ទ (Monday)", p1: STUDENT_LIST[7], p2: STUDENT_LIST[28] },
  { pairId: 12, dayName: "ថ្ងៃអង្គារ (Tuesday)", p1: STUDENT_LIST[29], p2: STUDENT_LIST[30] },
  { pairId: 13, dayName: "ថ្ងៃពុធ (Wednesday)", p1: STUDENT_LIST[31], p2: STUDENT_LIST[32] },
  { pairId: 14, dayName: "ថ្ងៃព្រហស្បតិ៍ (Thursday)", p1: STUDENT_LIST[33], p2: STUDENT_LIST[34] },
  { pairId: 15, dayName: "ថ្ងៃសុក្រ (Friday)", p1: STUDENT_LIST[35], p2: STUDENT_LIST[36] },
  { pairId: 16, dayName: "ថ្ងៃចន្ទ (Monday)", p1: STUDENT_LIST[37], p2: STUDENT_LIST[38] }, 
  { pairId: 17, dayName: "ថ្ងៃអង្គារ (Tuesday)", p1: STUDENT_LIST[39], p2: STUDENT_LIST[40] }, 
  { pairId: 18, dayName: "ថ្ងៃពុធ (Wednesday)", p1: STUDENT_LIST[1], p2: STUDENT_LIST[2] }, 
  { pairId: 19, dayName: "ថ្ងៃព្រហស្បតិ៍ (Thursday)", p1: STUDENT_LIST[3], p2: STUDENT_LIST[4] }, 
  { pairId: 20, dayName: "ថ្ងៃសុក្រ (Friday)", p1: STUDENT_LIST[5], p2: STUDENT_LIST[6] }
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
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swappingStudent, setSwappingStudent] = useState<any>(null);
  const [targetPairId, setTargetPairId] = useState<string>('');
  const [swapLoading, setSwapLoading] = useState(false);
  const [weeklySchedule, setWeeklySchedule] = useState<any[]>([]);

  useEffect(() => {
    const lastCheckedDate = localStorage.getItem('lastCheckedDate');
    const todayStr = new Date().toDateString();
    if (lastCheckedDate === todayStr) setIsCheckedIn(true);
    
    setAppLoading(false);
    setShowWelcome(true);

    const today = new Date();
    const dayOfWeek = today.getDay();
    setCurrentDateText(today.toLocaleDateString('km-KH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setIsWeekend(true);
    } else {
      setTodayDuty(DUTY_PAIRS[dayOfWeek - 1] || DUTY_PAIRS[0]);
    }

    setWeeklySchedule([
      { dayLabel: "ថ្ងៃចន្ទ (Mon)", pair: DUTY_PAIRS[0] },
      { dayLabel: "ថ្ងៃអង្គារ (Tue)", pair: DUTY_PAIRS[1] },
      { dayLabel: "ថ្ងៃពុធ (Wed)", pair: DUTY_PAIRS[2] },
      { dayLabel: "ថ្ងៃព្រហស្បតិ៍ (Thu)", pair: DUTY_PAIRS[3] },
      { dayLabel: "ថ្ងៃសុក្រ (Fri)", pair: DUTY_PAIRS[4] },
    ]);
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
      if (diff < 0) { target.setDate(target.getDate() + 1); diff = target.getTime() - now.getTime(); }
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setCountdownText(`${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, [isWeekend]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredStudents([]);
    } else {
      const q = searchQuery.toLowerCase();
      const results = STUDENT_LIST.filter(s =>
        s?.name?.toLowerCase().includes(q) ||
        s?.id?.toString().includes(q) ||
        s?.telegram_username?.toLowerCase().includes(q)
      ).map(s => {
        const duty = DUTY_PAIRS.find(p => p?.p1?.id === s.id || p?.p2?.id === s.id);
        return {
          ...s,
          dutyDay: duty?.dayName || "គ្មានវេន",
          partner: duty ? (duty.p1?.id === s.id ? duty.p2?.name : duty.p1?.name) : "គ្មានដៃគូ",
          pairId: duty?.pairId || null
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
      const msg = `🔄 *សេចក្តីជូនដំណឹង៖ ការសុំប្តូរវេនគ្នា*\n\nនិស្សិត ${swappingStudent.name} ស្នើសុំដូរវេនជាមួយ ${selectedPair.p1.name} & ${selectedPair.p2.name}`;
      await fetch(`https://api.telegram.org/bot8880912035:AAHZIZPcZCLpPhX8PxYuebTqGIigCXciyGY/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: "-1003502505377", text: msg, parse_mode: 'Markdown' }),
      });
      alert("ជោគជ័យ!");
      setShowSwapModal(false);
    } catch (e) { alert("បរាជ័យ"); }
    setSwapLoading(false);
  };

  const handleCheckIn = async () => {
    if (!todayDuty) return;
    setCheckInLoading(true);
    try {
      await fetch(`https://api.telegram.org/bot8880912035:AAHZIZPcZCLpPhX8PxYuebTqGIigCXciyGY/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: "-1003502505377", text: `🔔 ${todayDuty.p1.name} & ${todayDuty.p2.name} បាន Check-in រួចហើយ!`, parse_mode: 'Markdown' }),
      });
      setIsCheckedIn(true);
      localStorage.setItem('lastCheckedDate', new Date().toDateString());
    } catch (e) { console.error(e); }
    setCheckInLoading(false);
  };

  if (appLoading) return null;

  return (
    <main className="min-h-screen bg-[#02040a] text-slate-100 flex flex-col items-center p-6">
      {/* Search Input */}
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="ស្វែងរកឈ្មោះ..." className="w-full max-w-md bg-[#0b0f19] p-4 rounded-xl border border-white/10" />

      {/* Render Search Results */}
      <div className="w-full max-w-md mt-4">
        {filteredStudents.map(student => (
          <div key={student.id} className="p-4 bg-white/5 rounded-xl mb-2">
            <p className="font-bold">{student.name}</p>
            <button onClick={() => { setSwappingStudent(student); setShowSwapModal(true); }} className="text-blue-400 text-xs">🔄 ស្នើសុំដូរវេន</button>
          </div>
        ))}
      </div>

      {/* MODAL (ប្រើ key ដើម្បីជួសជុល Hydration Error) */}
      {showSwapModal && swappingStudent && (
        <div key={swappingStudent.id} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#0b0f19] p-6 rounded-2xl w-full max-w-sm border border-white/10">
            <h3 className="mb-4">ជ្រើសរើសក្រុមដូរវេន៖</h3>
            <select value={targetPairId} onChange={(e) => setTargetPairId(e.target.value)} className="w-full bg-[#030712] p-3 rounded-xl mb-4">
              <option value="">ជ្រើសរើស...</option>
              {DUTY_PAIRS.filter(p => p.pairId !== swappingStudent?.pairId).map(p => (
                <option key={p.pairId} value={p.pairId}>{p.dayName} - {p.p1.name}</option>
              ))}
            </select>
            <button onClick={handleRequestSwap} className="w-full p-3 bg-blue-500 rounded-xl">ផ្ញើសារ</button>
          </div>
        </div>
      )}
    </main>
  );
}