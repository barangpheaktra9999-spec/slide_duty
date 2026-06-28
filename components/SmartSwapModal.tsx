'use client';

import React, { useState, useEffect } from 'react';

export default function SmartSwapModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // បង្កើត Global Function សម្រាប់ឱ្យប៊ូតុងខាងក្រៅអាចហៅបើកផ្ទាំងនេះបាន
    (window as any).openSmartSwap = () => {
      setIsOpen(true);
      // ក្លែងធ្វើជាការគណនាស្វែងរកមិត្តភក្តិដែលទំនេរ (Algorithm Suggestion)
      setSuggestions(['Pha', 'Tong Den', 'Piseth']); 
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0b0f19] border border-white/10 rounded-2xl w-full max-w-sm p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <h3 className="text-sm font-semibold text-slate-200 font-khmer mb-2">🔄 ម៉ាស៊ីនគណនាដូរវេនឆ្លាតវៃ</h3>
        <p className="text-[11px] text-slate-400 font-khmer mb-4">ប្រព័ន្ធបានវិភាគ និងណែនាំមិត្តភក្តិដែលស័ក្តិសមបំផុតចំនួន ៣ នាក់សម្រាប់ការដូរវេន៖</p>

        <div className="space-y-2 mb-5">
          {suggestions.map((name, index) => (
            <div key={index} className="flex justify-between items-center p-2.5 bg-white/[0.02] border border-white/[0.04] rounded-xl">
              <span className="text-xs font-medium text-slate-300 font-mono">@{name}</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/25">ភាពទំនេរខ្ពស់</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 text-xs font-semibold rounded-xl transition-all"
          >
            បិទវិញ
          </button>
        </div>
      </div>
    </div>
  );
}