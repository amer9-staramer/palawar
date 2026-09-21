import React, { useState } from 'react';
import { SaleRecord } from '../types';
import { toKurdishDigits } from '../utils/formatters';
import { Menu, Plus, TrendingUp, CheckSquare, Square, Trash2, Check } from 'lucide-react';

interface SalesScreenProps {
  sales: SaleRecord[];
  onAddSale: (sale: Omit<SaleRecord, 'id' | 'totalAmount' | 'status'>) => void;
  onDeleteSale: (id: string) => void;
  onOpenDrawer: () => void;
}

export const SalesScreen: React.FC<SalesScreenProps> = ({
  sales,
  onAddSale,
  onDeleteSale,
  onOpenDrawer
}) => {
  // Form state
  const [chicksCount, setChicksCount] = useState<number | ''>('');
  const [pricePerChick, setPricePerChick] = useState<number | ''>('');
  const [city, setCity] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('2026-09-19');
  const [driver, setDriver] = useState('بى سايه ق ←');
  const [arrived, setArrived] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Summary Metrics
  const totalChicksSold = sales
    .filter((s) => s.status !== 'cancelled')
    .reduce((acc, s) => acc + s.chicksCount, 0);

  const totalIncomeReceived = sales
    .filter((s) => s.arrived || s.status === 'arrived')
    .reduce((acc, s) => acc + s.totalAmount, 0);

  const totalCancelled = sales.filter((s) => s.status === 'cancelled').length;

  const totalPendingIncome = sales
    .filter((s) => !s.arrived && s.status === 'order_pending')
    .reduce((acc, s) => acc + s.totalAmount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chicksCount || !pricePerChick || !phone.trim()) {
      alert('تکایە خانەکانی (عەدەد، سعر و ژمارەی مۆبایل) بنووسە چونکە ئیجبارین');
      return;
    }

    onAddSale({
      chicksCount: Number(chicksCount),
      pricePerChick: Number(pricePerChick),
      phone: phone.trim(),
      customerName: customerName.trim() || 'کڕیار',
      city: city.trim() || 'دەربەندیخان',
      notes: notes.trim(),
      date: date || '2026-09-19',
      driver: driver || 'بى سايه ق ←',
      arrived
    });

    setChicksCount('');
    setPricePerChick('');
    setCity('');
    setCustomerName('');
    setPhone('');
    setNotes('');
    setArrived(false);
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
          فروشتنه كان
        </h1>
      </div>

      {/* Subtitle */}
      <div className="px-5 pt-1 pb-4">
        <h2 className="text-lg font-black text-slate-900">فروشتنه كان</h2>
        <p className="text-xs text-slate-500 font-medium">تؤمار و فروشتنى جوجك</p>
      </div>

      {/* 4 Summary Cards (image_6.png) */}
      <div className="px-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
        {/* Card 1: جووتى فروشتراو */}
        <div className="bg-white border border-[#E8E2D6] p-3 rounded-2xl shadow-xs text-center">
          <span className="text-[11px] font-semibold text-slate-600 block">جووتى فروشتراو</span>
          <div className="text-lg font-black text-slate-900 font-mono mt-1">
            {toKurdishDigits(totalChicksSold)}
          </div>
          <span className="text-[9px] text-slate-400">جووت</span>
        </div>

        {/* Card 2: داهاتى گه يشتوو */}
        <div className="bg-[#DCECD8] border border-[#B9DDB2] p-3 rounded-2xl shadow-xs text-center">
          <span className="text-[11px] font-semibold text-[#205128] block">داهاتى گه يشتوو</span>
          <div className="text-sm font-black text-[#194B22] font-mono mt-1">
            {toKurdishDigits(totalIncomeReceived)}
          </div>
          <span className="text-[9px] text-[#33683A]">دینار</span>
        </div>

        {/* Card 3: كانسل بووه كان */}
        <div className="bg-white border border-[#E8E2D6] p-3 rounded-2xl shadow-xs text-center">
          <span className="text-[11px] font-semibold text-slate-600 block">كانسل بووه كان</span>
          <div className="text-lg font-black text-slate-900 font-mono mt-1">
            {toKurdishDigits(totalCancelled)}
          </div>
          <span className="text-[9px] text-slate-400">دانە</span>
        </div>

        {/* Card 4: چاوه روان */}
        <div className="bg-[#FFE5CF] border border-[#F6CBB0] p-3 rounded-2xl shadow-xs text-center">
          <span className="text-[11px] font-semibold text-[#8C3E14] block">چاوه روان</span>
          <div className="text-sm font-black text-[#7A330E] font-mono mt-1">
            {totalPendingIncome > 0 ? `${toKurdishDigits(totalPendingIncome).slice(0, 2)},...` : '٠'}
          </div>
          <span className="text-[9px] text-[#9A4C22]">دینار</span>
        </div>
      </div>

      {/* Multi-field Form (image_6.png, image_7.png) */}
      <div className="px-5 mb-6">
        <div className="bg-white border border-[#E8E2D6] p-5 rounded-2xl shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span>تۆمارکردنی فرۆشتنی نوێ</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Field 1: عەدەد (ژماره ى جووت) - ئیجباری */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>عەدەد (ژمارەی جووت)</span>
                <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded-sm">ئیجباری *</span>
              </label>
              <input
                type="number"
                required
                placeholder="بۆ نموونە: 25"
                value={chicksCount}
                onChange={(e) => setChicksCount(e.target.value ? Number(e.target.value) : '')}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field 2: سعر (نرخى جووت) - ئیجباری */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>سعر (نرخی جووت بە دینار)</span>
                <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded-sm">ئیجباری *</span>
              </label>
              <input
                type="number"
                required
                step="25"
                placeholder="بۆ نموونە: 2000"
                value={pricePerChick}
                onChange={(e) => setPricePerChick(e.target.value ? Number(e.target.value) : '')}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field 3: ژمارەی مۆبایل - ئیجباری */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>ژمارەی مۆبایل</span>
                <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded-sm">ئیجباری *</span>
              </label>
              <input
                type="tel"
                required
                placeholder="0750 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field 4: ناوى كڕيار - ئارەزوومەندانە */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>ناوی کڕیار</span>
                <span className="text-[10px] text-slate-400 font-normal">ئارەزوومەندانە</span>
              </label>
              <input
                type="text"
                placeholder="ناوی کڕیار یان مارکێت (ئیختیاری)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field 5: شار - ئارەزوومەندانە */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>شار</span>
                <span className="text-[10px] text-slate-400 font-normal">ئارەزوومەندانە</span>
              </label>
              <input
                type="text"
                placeholder="دەربەندیخان، سلێمانی، هەولێر..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field 6: تێبينى - ئارەزوومەندانە */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>تێبینی</span>
                <span className="text-[10px] text-slate-400 font-normal">ئارەزوومەندانە</span>
              </label>
              <input
                type="text"
                placeholder="تێبینی فرۆشتن..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field 7: رێكه وت - ئارەزوومەندانە */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>ڕێکەوت</span>
                <span className="text-[10px] text-slate-400 font-normal">ئارەزوومەندانە</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field 8: سايه ق (گه ياندن) - ئارەزوومەندانە */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>سایەق (گەیاندن)</span>
                <span className="text-[10px] text-slate-400 font-normal">ئارەزوومەندانە</span>
              </label>
              <select
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              >
                <option value="بى سايه ق ←">بى سايه ق ←</option>
                <option value="سەردار بارهەڵگر">سەردار بارهەڵگر</option>
                <option value="ئارام مازدا">ئارام مازدا</option>
                <option value="بەهزاد گۆران">بەهزاد گۆران</option>
              </select>
            </div>

            {/* Checkbox 'گه يشت؟' with explanatory text */}
            <div className="pt-1">
              <label
                onClick={() => setArrived(!arrived)}
                className="flex items-start gap-2.5 cursor-pointer select-none"
              >
                <div className="mt-0.5 text-emerald-800">
                  {arrived ? (
                    <CheckSquare className="w-4 h-4 text-emerald-700" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800">گه يشت؟</span>
                  <p className="text-[11px] text-slate-500">
                    ئەگەر بارەکە گەیشتبێت و پارەکە وەرگیرابێت، نیشانەی بکە
                  </p>
                </div>
              </label>
            </div>

            {/* Total Preview */}
            {chicksCount && pricePerChick ? (
              <div className="p-3 bg-[#E8F3E5] border border-[#BDDEB7] rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-900">کۆی گشتی داهات:</span>
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
              <span>فرۆشتنەکە بە سەرکەوتوویی تۆمارکرا</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
