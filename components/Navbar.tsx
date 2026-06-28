'use client';

import React, { useEffect, useState } from 'react';

interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
  photo_url?: string;
}

export default function Navbar() {
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    // ទាញយកទិន្នន័យ User ពី LocalStorage បើធ្លាប់ Login រួច
    const savedUser = localStorage.getItem('tg_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // បង្កើតប៊ូតុង Telegram Widget Login ដោយស្វ័យប្រវត្ត
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || 'YourBotName');
    script.setAttribute('data-size', 'medium');
    script.setAttribute('data-radius', '10');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.async = true;

    const placeholder = document.getElementById('telegram-login-container');
    if (placeholder && !savedUser) {
      placeholder.appendChild(script);
    }

    // បង្កើត Global Function ដើម្បីទទួលទិន្នន័យពេល Login ជោគជ័យ
    (window as any).onTelegramAuth = (tgUser: TelegramUser) => {
      localStorage.setItem('tg_user', JSON.stringify(tgUser));
      setUser(tgUser);
      window.location.reload();
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('tg_user');
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className="w-full border-b border-white/[0.08] bg-[#070a12]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
        <span className="font-semibold text-sm tracking-wide text-slate-200">RUPP ITE A3 - PORTAL</span>
      </div>

      <div>
        {user ? (
          <div className="flex items-center gap-3">
            {user.photo_url && (
              <img src={user.photo_url} alt="Profile" className="w-7 h-7 rounded-full border border-emerald-500/50" />
            )}
            <span className="text-xs text-slate-300 font-mono">@{user.username || user.first_name}</span>
            <button 
              onClick={handleLogout}
              className="text-[11px] bg-red-500/10 hover:bg-red-500/20 text-red-400 px-2.5 py-1 rounded-md transition-all border border-red-500/20"
            >
              Logout
            </button>
          </div>
        ) : (
          <div id="telegram-login-container"></div>
        )}
      </div>
    </nav>
  );
}