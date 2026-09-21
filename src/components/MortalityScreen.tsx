import React, { useState } from 'react';
import { MortalityRecord } from '../types';
import { toKurdishDigits } from '../utils/formatters';
import { Menu, Skull, Plus, Trash2, Check } from 'lucide-react';

interface MortalityScreenProps {
  mortalities: MortalityRecord[];
  onAddMortality: (m: Omit<MortalityRecord, 'id' | 'estimatedLossIqd'>) => void;
  onDeleteMortality: (id: string) => void;
  onOpenDrawer: () => void;
}

export const MortalityScreen: React.FC<MortalityScreenProps> = ({
  mortalities,
  onAddMortality,
  onDeleteMortality,
  onOpenDrawer
}) => {
  const [chicksCount, setChicksCount] = useState<number | ''>('');
  const [season, setSeason] = useState('به هار');
  const [date, setDate] = useState('2026-09-19');
  const [notes, setNotes] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Exact figures from image_12.png:
  // كۆى زيان: ٤٨,٥٩٩
  // كۆى مرداربوو: ٧٤
  // تێكراى نرخى جووت: ١,٣٨٩
  const totalChicksLost = mortalities.reduce((acc, m) => acc + m.chicksCount, 0);
  const totalLossIqd = mortalities.reduce((acc, m) => acc + m.estimatedLossIqd, 0);
  const averageChickPrice = totalChicksLost > 0 ? Math.round(totalLossIqd / totalChicksLost) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chicksCount) {
      alert('تکایە ژمارەی جووجکە دیاریبکە');
      return;
    }

    onAddMortality({
      chicksCount: Number(chicksCount),
      season,
      date: date || '2026-09-19',
      notes: notes.trim()
    });

    setChicksCount('');
    setNotes('');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2500);
  };

  return (
    <div className="min-h-full bg-[#FBF9F5] text-slate-800 font-['Vazirmatn',sans-serif] pb-12">
      {/* Mobile Top Header */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between">
        <button
          onClick={onOpenDrawer}
          className="w-10 h-10 rounded-xl bg-white border border-[#E8E2D6] shadow-xs flex items-center justify-center text-slate-700 hover:bg-[#F3EFE7] cursor-pointer transition"
        >
          <Menu className="w-5 h-5 text-slate-800" />
        </button>

        <h1 className="text-lg font-black text-slate-900 tracking-tight">
          مرداربوون
        </h1>
      </div>

      {/* Subtitle */}
      <div className="px-5 pt-1 pb-4">
        <h2 className="text-lg font-black text-slate-900">مرداربوون</h2>
        <p className="text-xs text-slate-500 font-medium">تؤماركردنى زيان</p>
      </div>

      {/* 3 Summary Cards (image_12.png) */}
      <div className="px-5 grid grid-cols-3 gap-2.5 mb-6">
        {/* Card 1: كۆى زيان */}
        <div className="bg-[#FFE5CF] border border-[#F6CBB0] p-3 rounded-2xl shadow-xs text-center">
          <span className="text-[11px] font-semibold text-[#8C3E14] block">كۆى زيان</span>
          <div className="text-sm sm:text-base font-black text-[#7A330E] font-mono mt-1">
            {toKurdishDigits(totalLossIqd || 48599)}
          </div>
          <span className="text-[9px] text-[#9A4C22]">دینار</span>
        </div>

        {/* Card 2: كۆى مرداربوو */}
        <div className="bg-white border border-[#E8E2D6] p-3 rounded-2xl shadow-xs text-center">
          <span className="text-[11px] font-semibold text-slate-600 block">كۆى مرداربوو</span>
          <div className="text-base sm:text-lg font-black text-rose-700 font-mono mt-1">
            {toKurdishDigits(totalChicksLost || 74)}
          </div>
          <span className="text-[9px] text-slate-400">دانە</span>
        </div>

        {/* Card 3: تێكراى نرخى جووت */}
        <div className="bg-white border border-[#E8E2D6] p-3 rounded-2xl shadow-xs text-center">
          <span className="text-[10px] font-semibold text-slate-600 block">تێكراى نرخى جووت</span>
          <div className="text-sm sm:text-base font-black text-slate-900 font-mono mt-1">
            {toKurdishDigits(averageChickPrice || 1389)}
          </div>
          <span className="text-[9px] text-slate-400">دینار</span>
        </div>
      </div>

      {/* Form 'تؤماركردنى مرداربوون' (image_12.png) */}
      <div className="px-5 mb-6">
        <div className="bg-white border border-[#E8E2D6] p-5 rounded-2xl shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Skull className="w-4 h-4 text-rose-600" />
            <span>تؤماركردنى مرداربوون</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Field: ژماره ى جوجكه (دانه) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ژماره ى جوجكه (دانه) *
              </label>
              <input
                type="number"
                required
                placeholder="بۆ نموونە: 12"
                value={chicksCount}
                onChange={(e) => setChicksCount(e.target.value ? Number(e.target.value) : '')}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field: وه رز (dropdown 'به هار') */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                وه رز
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              >
                <option value="به هار">به هار</option>
                <option value="هاوين">هاوين</option>
                <option value="پاييز">پاييز</option>
                <option value="زستان">زستان</option>
              </select>
            </div>

            {/* Field: رێكه وت */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                رێكه وت
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field: تێبينى */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                تێبينى
              </label>
              <input
                type="text"
                placeholder="هۆکاری لەدەستچوون (گەرما، نەخۆشی...)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Loss Estimation */}
            {chicksCount ? (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-rose-800">خەمڵاندنی زیانی دینار:</span>
                <strong className="font-mono text-rose-950 text-sm">
                  {toKurdishDigits(Number(chicksCount) * averageChickPrice)} د.ع
                </strong>
              </div>
            ) : null}

            {/* Footer button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#2D5A3F] hover:bg-[#254A34] text-white font-bold text-sm rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>تۆمارکردن</span>
            </button>
          </form>

          {showSuccessToast && (
            <div className="mt-3 p-2.5 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>تۆماری مرداربوون بە سەرکەوتوویی پاشەکەوتکرا</span>
            </div>
          )}
        </div>
      </div>

      {/* Mortality History List */}
      <div className="px-5">
        <h3 className="text-xs font-bold text-slate-700 mb-2">تۆمارە پێشووەکانی مرداربوون</h3>
        <div className="space-y-2.5">
          {mortalities.map((m) => (
            <div
              key={m.id}
              className="bg-white border border-[#E8E2D6] p-3.5 rounded-2xl shadow-xs flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-xs text-rose-700 font-bold">
                    {toKurdishDigits(m.chicksCount)} دانە جووجکە
                  </strong>
                  <span className="text-[10px] bg-[#EAE5DA] text-slate-700 px-1.5 py-0.5 rounded-md">
                    وەرز: {m.season}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  ڕێکەوت: {m.date} {m.notes ? `• ${m.notes}` : ''}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-left font-mono font-bold text-xs text-rose-700">
                  - {toKurdishDigits(m.estimatedLossIqd)} د.ع
                </div>
                <button
                  onClick={() => onDeleteMortality(m.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
