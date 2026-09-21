import React from 'react';
import { Wifi, Signal, MessageCircle } from 'lucide-react';

interface MobileStatusBarProps {
  time?: string;
}

export const MobileStatusBar: React.FC<MobileStatusBarProps> = ({ time = '2:21' }) => {
  return (
    <div className="w-full bg-[#0E0F12] text-white select-none z-30 shrink-0">
      {/* Top Phone System Bar */}
      <div className="px-4 pt-1.5 pb-1 flex items-center justify-between text-xs">
        {/* Left: Time and Messenger icon */}
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-xs tracking-tight font-mono">{time}</span>
          <MessageCircle className="w-3 h-3 text-white fill-current opacity-90" />
        </div>

        {/* Right: Network, Wifi, Battery with percentage */}
        <div className="flex items-center gap-2 text-white">
          <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
          <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
          <div className="flex items-center border border-white/80 rounded-md px-1 py-0.2 text-[9px] font-bold font-mono leading-none">
            <span>66</span>
          </div>
        </div>
      </div>

      {/* App Branding Bar on Black (as seen in screenshot) */}
      <div className="px-5 py-2 flex items-center justify-between">
        {/* Title: پەلەوەر on left */}
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide font-['Vazirmatn',sans-serif]">
          پەلەوەر
        </h1>

        {/* Chicken / Rooster silhouette icon in gray on right */}
        <div className="text-[#555960]">
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-label="Chicken silhouette">
            <path d="M19.5 8c-.3 0-.6.1-.9.2C17.8 6.3 16 5 14 5c-.3 0-.6 0-.9.1C12.4 3.3 10.3 2 8 2 4.7 2 2 4.7 2 8c0 1.2.4 2.4 1 3.4C2.4 12.4 2 13.6 2 15c0 3.3 2.7 6 6 6h1v-2H8c-2.2 0-4-1.8-4-4 0-1.2.5-2.2 1.4-3 .1.7.5 1.3 1 1.7.4.4.9.6 1.4.6.4 0 .7-.1 1.1-.3.8-.5 1.1-1.5.7-2.3-.2-.5-.7-.8-1.2-.9-.3 0-.5.1-.8.2-.4-.9-.6-1.9-.6-3 0-2.2 1.8-4 4-4 1.5 0 2.8.8 3.5 2.1-.5.4-.9 1-1.1 1.7-.3.9 0 1.9.8 2.5.4.3.9.5 1.4.5.3 0 .7-.1 1-.2 1.2-.7 1.6-2.2.9-3.4-.1-.2-.2-.4-.4-.6.8-.7 1.8-1.1 3-1.1 1.8 0 3.4 1.2 3.8 3H16v2h4c1.1 0 2 .9 2 2s-.9 2-2 2h-1v2h1c2.2 0 4-1.8 4-4 0-2.2-1.8-4-4-4zM8 19v2h2v-2H8zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
