'use client';

import React, { useState } from 'react';

interface Member {
  name: string;
  telegram: string;
}

interface DutyData {
  p1: Member;
  p2: Member;
  backup: Member;
}

export default function ActiveDutyCard({ todayDuty }: { todayDuty: DutyData }) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    setLoading(true);
    // ក្លែងធ្វើជាការបញ្ជូនទិន្នន័យទៅ Firebase (Simulation)
    setTimeout(() => {
      setIsCheckedIn(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#0b0f19] border border-white/[0.06] rounded-2xl p-6 shadow-xl">
      <h2 className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-4">📢 សមាជិកមានវេនថ្ងៃនេះ</h2>
      
      <div className="space-y-3 mb-6">
        <div className="p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
          <p className="text-[10px] text-slate-500 font-mono uppercase">Primary Speaker 01</p>
          <p className="text-sm font-medium text-slate-200 mt-0.5">{todayDuty.p1.name}</p>
        </div>
        <div className="p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
          <p className="text-[10px] text-slate-500 font-mono uppercase">Primary Speaker 02</p>
          <p className="text-sm font-medium text-slate-200 mt-0.5">{todayDuty.p2.name}</p>
        </div>
        <div className="p-3 bg-red-500/[0.02] rounded-xl border border-red-500/10">
          <p className="text-[10px] text-red-400/60 font-mono uppercase">Backup Member</p>
          <p className="text-sm font-medium text-red-300 mt-0.5">{todayDuty.backup.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleCheckIn}
          disabled={isCheckedIn || loading}
          className={`py-2.5 px-4 rounded-xl text-xs font-semibold font-khmer transition-all ${
            isCheckedIn 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
              : 'bg-emerald-500 hover:bg-emerald-600 text-slate-900 shadow-lg shadow-emerald-500/10'
          }`}
        >
          {loading ? 'កំពុងរក្សាទុក...' : isCheckedIn ? '✓ វត្តមានរួចរាល់' : '✓ ចុច Check-in'}
        </button>
        
        <button 
          className="py-2.5 px-4 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 text-xs font-semibold font-khmer rounded-xl transition-all"
          onClick={() => (window as any).openSmartSwap?.()}
        >
          🔄 សុំដូរវេនឆ្លាតវៃ
        </button>
      </div>
    </div>
  );
}