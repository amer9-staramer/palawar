import React, { useState } from 'react';
import { PurchaseRecord } from '../types';
import { toKurdishDigits, formatKurdishIQD } from '../utils/formatters';
import { Menu, Plus, ShoppingCart, Calendar, MapPin, Trash2, Check } from 'lucide-react';

interface PurchasesScreenProps {
  purchases: PurchaseRecord[];
  onAddPurchase: (item: Omit<PurchaseRecord, 'id' | 'totalAmount'>) => void;
  onDeletePurchase: (id: string) => void;
  onOpenDrawer: () => void;
}

export const PurchasesScreen: React.FC<PurchasesScreenProps> = ({
  purchases,
  onAddPurchase,
  onDeletePurchase,
  onOpenDrawer
}) => {
  // Form state
  const [chicksCount, setChicksCount] = useState<number | ''>('');
  const [pricePerChick, setPricePerChick] = useState<number | ''>('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('2026-09-19');
  const [notes, setNotes] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Calculations
  const totalChicksBought = purchases.reduce((acc, p) => acc + p.chicksCount, 0);
  const totalPurchaseExpense = purchases.reduce((acc, p) => acc + p.totalAmount, 0);
  const recordCount = purchases.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chicksCount || !pricePerChick) {
      alert('تکایە ژمارەی جووت و نرخی جووت دیاریبکە');
      return;
    }

    onAddPurchase({
      chicksCount: Number(chicksCount),
      pricePerChick: Number(pricePerChick),
      location: location.trim() || 'کێڵگەی پەلەوەر',
      date: date || '2026-09-19',
      notes: notes.trim()
    });

    setChicksCount('');
    setPricePerChick('');
    setLocation('');
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
          كرينه كان
        </h1>
      </div>

      {/* Subtitle */}
      <div className="px-5 pt-1 pb-4">
        <h2 className="text-lg font-black text-slate-900">كرينه كان</h2>
        <p className="text-xs text-slate-500 font-medium">تؤماركردنى كرينى جوجك</p>
      </div>

      {/* 3 Summary Cards */}
      <div className="px-5 grid grid-cols-3 gap-2.5 mb-6">
        {/* Card 1: كۆى جووتى كراو */}
        <div className="bg-white border border-[#E8E2D6] p-3 rounded-2xl shadow-xs text-center">
          <span className="text-[11px] font-semibold text-slate-600 block">كۆى جووتى كراو</span>
          <div className="text-base sm:text-lg font-black text-slate-900 font-mono mt-1">
            {toKurdishDigits(totalChicksBought)}
          </div>
          <span className="text-[9px] text-slate-400">جووت</span>
        </div>

        {/* Card 2: كۆى خه رجى كرين */}
        <div className="bg-[#DCECD8] border border-[#B9DDB2] p-3 rounded-2xl shadow-xs text-center">
          <span className="text-[11px] font-semibold text-[#205128] block">كۆى خه رجى كرين</span>
          <div className="text-sm sm:text-base font-black text-[#194B22] font-mono mt-1">
            {toKurdishDigits(totalPurchaseExpense)}
          </div>
          <span className="text-[9px] text-[#33683A]">دینار</span>
        </div>

        {/* Card 3: ژماره ى تؤمار */}
        <div className="bg-white border border-[#E8E2D6] p-3 rounded-2xl shadow-xs text-center">
          <span className="text-[11px] font-semibold text-slate-600 block">ژماره ى تؤمار</span>
          <div className="text-base sm:text-lg font-black text-slate-900 font-mono mt-1">
            {toKurdishDigits(recordCount)}
          </div>
          <span className="text-[9px] text-slate-400">پسوولە</span>
        </div>
      </div>

      {/* Form with Peach-colored Data Entry Fields (image_3, 4, 5) */}
      <div className="px-5 mb-6">
        <div className="bg-white border border-[#E8E2D6] p-5 rounded-2xl shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-emerald-700" />
            <span>فۆڕمی کڕینی نوێی جووجکە</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Field 1: ژماره ى جووت */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ژماره ى جووت *
              </label>
              <input
                type="number"
                required
                placeholder="بۆ نموونە: 250"
                value={chicksCount}
                onChange={(e) => setChicksCount(e.target.value ? Number(e.target.value) : '')}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field 2: نرخى جووت (دينار) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                نرخى جووت (دينار) *
              </label>
              <input
                type="number"
                required
                step="25"
                placeholder="بۆ نموونە: 1400"
                value={pricePerChick}
                onChange={(e) => setPricePerChick(e.target.value ? Number(e.target.value) : '')}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field 3: شوێنى كرين */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                شوێنى كرين
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="ناوی کێڵگە یان شار (هەولێر، چەمچەماڵ...)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Field 4: رێكه وت (Dropdown & date 09/19/2026) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                رێكه وت
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
                />
              </div>
            </div>

            {/* Field 5: تێبينى (ئيبتيارى) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                تێبينى (ئيبتيارى)
              </label>
              <input
                type="text"
                placeholder="هەر تێبینییەکی پەیوەندیدار بنووسە..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Total Preview */}
            {chicksCount && pricePerChick ? (
              <div className="p-3 bg-[#E8F3E5] border border-[#BDDEB7] rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-900">کۆی تێچووی پێشبینیکراو:</span>
                <strong className="font-mono text-emerald-950 text-sm">
                  {toKurdishDigits(Number(chicksCount) * Number(pricePerChick))} د.ع
                </strong>
              </div>
            ) : null}

            {/* Footer Button: زيادكردن */}
            <button
              type="submit"
              className="w-full py-3 bg-[#2D5A3F] hover:bg-[#254A34] text-white font-bold text-sm rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>زيادكردن</span>
            </button>
          </form>

          {showSuccessToast && (
            <div className="mt-3 p-2.5 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>کڕینەکە بە سەرکەوتوویی تۆمارکرا</span>
            </div>
          )}
        </div>
      </div>

      {/* List of Previous Purchases */}
      <div className="px-5">
        <h3 className="text-xs font-bold text-slate-700 mb-2">تۆماری کڕینەکانی پێشوو</h3>
        <div className="space-y-2.5">
          {purchases.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-[#E8E2D6] p-3.5 rounded-2xl shadow-xs flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-xs text-slate-900 font-bold">{p.location}</strong>
                  <span className="text-[10px] bg-[#EAE5DA] text-slate-700 px-1.5 py-0.5 rounded-md font-mono">
                    {p.date}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {toKurdishDigits(p.chicksCount)} جووت @ {toKurdishDigits(p.pricePerChick)} دینار
                </p>
                {p.notes && <p className="text-[10px] text-slate-400 mt-0.5">{p.notes}</p>}
              </div>

              <div className="flex items-center gap-3">
                <div className="text-left font-mono font-black text-xs text-slate-900">
                  {toKurdishDigits(p.totalAmount)} د.ع
                </div>
                <button
                  onClick={() => onDeletePurchase(p.id)}
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
