import React, { useState } from 'react';
import { WalletTransaction } from '../types';
import { toKurdishDigits } from '../utils/formatters';
import { Menu, Wallet, Plus, ArrowUpRight, ArrowDownLeft, Target, Check } from 'lucide-react';

interface WalletScreenProps {
  transactions: WalletTransaction[];
  onAddTransaction: (t: Omit<WalletTransaction, 'id'>) => void;
  onOpenDrawer: () => void;
}

export const WalletScreen: React.FC<WalletScreenProps> = ({
  transactions,
  onAddTransaction,
  onOpenDrawer
}) => {
  // Target state
  const [targetAmount, setTargetAmount] = useState<number>(1344000);
  const [savedTargetNotice, setSavedTargetNotice] = useState(false);

  // Form state
  const [movementType, setMovementType] = useState<'add' | 'withdraw'>('add');
  const [currency, setCurrency] = useState<'IQD' | 'USD'>('IQD');
  const [amount, setAmount] = useState<number | ''>('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('2026-09-19');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Financial aggregates
  const totalAdded = transactions
    .filter((t) => t.type === 'add')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalWithdrawn = transactions
    .filter((t) => t.type === 'withdraw')
    .reduce((acc, t) => acc + t.amount, 0);

  const currentWallet = totalAdded - totalWithdrawn;
  const targetPercentage = targetAmount > 0 ? Math.min(100, Math.round((currentWallet / targetAmount) * 100)) : 50;

  const handleSubmitMovement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      alert('تکایە بڕی پارە بنووسە');
      return;
    }

    onAddTransaction({
      type: movementType,
      currency,
      amount: Number(amount),
      date: date || '2026-09-19',
      notes: notes.trim()
    });

    setAmount('');
    setNotes('');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2500);
  };

  const handleSaveTarget = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedTargetNotice(true);
    setTimeout(() => setSavedTargetNotice(false), 2500);
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
          جزدان و مايه
        </h1>
      </div>

      {/* Subtitle */}
      <div className="px-5 pt-1 pb-4">
        <h2 className="text-lg font-black text-slate-900">جزدان و مايه</h2>
        <p className="text-xs text-slate-500 font-medium">
          پاره ى كه سى و به رێوه بردنى جزدانى ئيشه كه
        </p>
      </div>

      {/* Top 4 Cards (image_10.png) */}
      <div className="px-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
        {/* Card 1: كۆى زيادكراو */}
        <div className="bg-white border border-[#E8E2D6] p-3 rounded-2xl shadow-xs text-center">
          <span className="text-[11px] font-semibold text-slate-600 block">كۆى زيادكراو</span>
          <div className="text-base font-black text-emerald-800 font-mono mt-1">
            {toKurdishDigits(totalAdded)}
          </div>
          <span className="text-[9px] text-slate-400">دینار</span>
        </div>

        {/* Card 2: جزدانى ئێستا */}
        <div className="bg-[#DCECD8] border border-[#B9DDB2] p-3 rounded-2xl shadow-xs text-center">
          <span className="text-[11px] font-semibold text-[#205128] block">جزدانى ئێستا</span>
          <div className="text-base font-black text-[#194B22] font-mono mt-1">
            {toKurdishDigits(currentWallet)}
          </div>
          <span className="text-[9px] text-[#33683A]">دینار</span>
        </div>

        {/* Card 3: رێژه ى تارگێت ٥٠% */}
        <div className="bg-white border border-[#E8E2D6] p-3 rounded-2xl shadow-xs text-center">
          <span className="text-[11px] font-semibold text-slate-600 block">رێژه ى تارگێت</span>
          <div className="text-base font-black text-blue-800 font-mono mt-1">
            {toKurdishDigits(targetPercentage)}%
          </div>
          <span className="text-[9px] text-slate-400">لە ئامانج</span>
        </div>

        {/* Card 4: ده ركراو */}
        <div className="bg-[#FFE5CF] border border-[#F6CBB0] p-3 rounded-2xl shadow-xs text-center">
          <span className="text-[11px] font-semibold text-[#8C3E14] block">ده ركراو</span>
          <div className="text-base font-black text-[#7A330E] font-mono mt-1">
            {toKurdishDigits(totalWithdrawn)}
          </div>
          <span className="text-[9px] text-[#9A4C22]">دینار</span>
        </div>
      </div>

      {/* Progress Bar: پێشكه وتنى تارگێت */}
      <div className="px-5 mb-6">
        <div className="bg-white border border-[#E8E2D6] p-4 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
            <span className="text-slate-800">پێشكه وتنى تارگێت</span>
            <span className="text-emerald-800 font-mono">{toKurdishDigits(targetPercentage)}%</span>
          </div>
          <div className="w-full bg-[#EFE9DD] rounded-full h-3 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${targetPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-mono">
            <span>٠ دینار</span>
            <span>تارگێت: {toKurdishDigits(targetAmount)} دینار</span>
          </div>
        </div>
      </div>

      {/* Form 1: جولاندنى جزدان (image_10.png, image_11.png) */}
      <div className="px-5 mb-6">
        <div className="bg-white border border-[#E8E2D6] p-5 rounded-2xl shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-emerald-700" />
            <span>جولاندنى جزدان</span>
          </h3>

          <form onSubmit={handleSubmitMovement} className="space-y-3.5">
            {/* Movement Type Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMovementType('add')}
                className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  movementType === 'add'
                    ? 'bg-[#DCECD8] text-[#194B22] border-[#B9DDB2]'
                    : 'bg-[#F9F6F0] text-slate-600 border-[#E8E2D6]'
                }`}
              >
                <ArrowDownLeft className="w-3.5 h-3.5" />
                <span>زیادکردن (داهات)</span>
              </button>

              <button
                type="button"
                onClick={() => setMovementType('withdraw')}
                className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  movementType === 'withdraw'
                    ? 'bg-[#FFE5CF] text-[#7A330E] border-[#F6CBB0]'
                    : 'bg-[#F9F6F0] text-slate-600 border-[#E8E2D6]'
                }`}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>دەرکردن (ڕاکێشان)</span>
              </button>
            </div>

            {/* Currency Selectors (IQD, USD) */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">دراو:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrency('IQD')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border cursor-pointer ${
                    currency === 'IQD'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-[#E8E2D6]'
                  }`}
                >
                  IQD (دینار)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border cursor-pointer ${
                    currency === 'USD'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-[#E8E2D6]'
                  }`}
                >
                  USD (دۆلار)
                </button>
              </div>
            </div>

            {/* Field: بڕى پاره (دينار) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                بڕى پاره (دينار) *
              </label>
              <input
                type="number"
                required
                step="5000"
                placeholder="بۆ نموونە: 495000"
                value={amount}
                onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field: تێبينى (ئيبتيارى) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                تێبينى (ئيبتيارى)
              </label>
              <input
                type="text"
                placeholder="هۆکاری جووڵاندنی جزدان بنووسە..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field: رێكه وت (09/19/2026) */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#2D5A3F] hover:bg-[#254A34] text-white font-bold text-sm rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>پاشەکەوتکردنی جووڵە</span>
            </button>
          </form>

          {showSuccessToast && (
            <div className="mt-3 p-2.5 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>جووڵەی جزدان سەرکەوتووانە تۆمارکرا</span>
            </div>
          )}
        </div>
      </div>

      {/* Section: دياريكردنى تارگێت (image_11.png) */}
      <div className="px-5">
        <div className="bg-white border border-[#E8E2D6] p-5 rounded-2xl shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-700" />
            <span>دياريكردنى تارگێت</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            دیاریکردنی ئامانجی کۆکراوەی دارایی کێڵگە
          </p>

          <form onSubmit={handleSaveTarget} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                تارگێت (دينار)
              </label>
              <input
                type="number"
                step="10000"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
            >
              پاراستن
            </button>
          </form>

          {savedTargetNotice && (
            <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold text-center">
              ئامانج بە سەرکەوتوویی نوێکرایەوە
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
