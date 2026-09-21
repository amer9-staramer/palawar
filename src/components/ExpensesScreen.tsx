import React, { useState } from 'react';
import { ExpenseRecord } from '../types';
import { toKurdishDigits } from '../utils/formatters';
import { Menu, Receipt, Plus, Trash2, Check, Fuel, Sparkles, Filter } from 'lucide-react';

interface ExpensesScreenProps {
  expenses: ExpenseRecord[];
  onAddExpense: (e: Omit<ExpenseRecord, 'id'>) => void;
  onDeleteExpense: (id: string) => void;
  onOpenDrawer: () => void;
}

export const ExpensesScreen: React.FC<ExpensesScreenProps> = ({
  expenses,
  onAddExpense,
  onDeleteExpense,
  onOpenDrawer
}) => {
  const [type, setType] = useState<'ئالف' | 'دەرمان' | 'نێرگەلە' | 'بەنزین' | 'خۆم' | 'هیتر'>('ئالف');
  const [selectedFilter, setSelectedFilter] = useState<string>('هەموو');
  const [amount, setAmount] = useState<number | ''>('');
  const [date, setDate] = useState('2026-09-19');
  const [notes, setNotes] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Aggregates
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const feedExpenses = expenses.filter((e) => e.type === 'ئالف').reduce((acc, e) => acc + e.amount, 0);
  const medExpenses = expenses.filter((e) => e.type === 'دەرمان').reduce((acc, e) => acc + e.amount, 0);
  const nargilaExpenses = expenses.filter((e) => e.type === 'نێرگەلە').reduce((acc, e) => acc + e.amount, 0);
  const fuelExpenses = expenses.filter((e) => e.type === 'بەنزین').reduce((acc, e) => acc + e.amount, 0);
  const selfExpenses = expenses.filter((e) => e.type === 'خۆم').reduce((acc, e) => acc + e.amount, 0);
  const otherExpenses = expenses.filter((e) => e.type === 'هیتر').reduce((acc, e) => acc + e.amount, 0);

  const filteredExpenses = selectedFilter === 'هەموو'
    ? expenses
    : expenses.filter(e => e.type === selectedFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      alert('تکایە بڕی خەرجی بنووسە');
      return;
    }

    onAddExpense({
      type,
      amount: Number(amount),
      date: date || '2026-09-19',
      notes: notes.trim()
    });

    setAmount('');
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

        <h1 className="text-xl font-black text-slate-900 tracking-tight">
          خەرجییەکان
        </h1>
      </div>

      {/* Subtitle */}
      <div className="px-5 pt-1 pb-4">
        <h2 className="text-2xl font-black text-slate-900">خەرجییەکانی پەلەوەر</h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          ئالف، دەرمان، نێرگەلە، بەنزین، خۆم و هیتر
        </p>
      </div>

      {/* Summary Cards Grid */}
      <div className="px-5 mb-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
          {/* Card 1: كۆى گشتى */}
          <div className="bg-[#FFE5CF] border border-[#F6CBB0] p-3 rounded-2xl shadow-xs col-span-2 sm:col-span-1">
            <span className="text-xs font-bold text-[#8C3E14] block">کۆی گشتی خەرجی</span>
            <div className="text-xl font-black text-[#7A330E] font-mono mt-1" dir="ltr">
              {toKurdishDigits(totalExpenses)} <span className="text-xs">د.ع</span>
            </div>
          </div>

          {/* Card 2: ئالف */}
          <div className="bg-white border border-[#E8E2D6] p-3 rounded-2xl shadow-xs">
            <span className="text-xs font-bold text-slate-600 block">ئالف</span>
            <div className="text-lg font-black text-slate-900 font-mono mt-1" dir="ltr">
              {toKurdishDigits(feedExpenses)}
            </div>
          </div>

          {/* Card 3: ده رمان */}
          <div className="bg-white border border-[#E8E2D6] p-3 rounded-2xl shadow-xs">
            <span className="text-xs font-bold text-slate-600 block">دەرمان</span>
            <div className="text-lg font-black text-slate-900 font-mono mt-1" dir="ltr">
              {toKurdishDigits(medExpenses)}
            </div>
          </div>

          {/* Card 4: نێرگەلە */}
          <div className="bg-[#FFF4E5] border border-[#FED7AA] p-3 rounded-2xl shadow-xs">
            <span className="text-xs font-bold text-amber-800 block">نێرگەلە</span>
            <div className="text-lg font-black text-amber-950 font-mono mt-1" dir="ltr">
              {toKurdishDigits(nargilaExpenses)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Card 5: بەنزین */}
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-3 rounded-2xl shadow-xs">
            <span className="text-xs font-bold text-blue-800 block">بەنزین</span>
            <div className="text-lg font-black text-blue-950 font-mono mt-1" dir="ltr">
              {toKurdishDigits(fuelExpenses)}
            </div>
          </div>

          {/* Card 6: خۆم */}
          <div className="bg-white border border-[#E8E2D6] p-3 rounded-2xl shadow-xs">
            <span className="text-xs font-bold text-slate-600 block">خۆم</span>
            <div className="text-lg font-black text-slate-900 font-mono mt-1" dir="ltr">
              {toKurdishDigits(selfExpenses)}
            </div>
          </div>

          {/* Card 7: هیتر */}
          <div className="bg-white border border-[#E8E2D6] p-3 rounded-2xl shadow-xs">
            <span className="text-xs font-bold text-slate-600 block">هیتر</span>
            <div className="text-lg font-black text-slate-900 font-mono mt-1" dir="ltr">
              {toKurdishDigits(otherExpenses)}
            </div>
          </div>
        </div>
      </div>

      {/* Form 'خەرجی نوێ' */}
      <div className="px-5 mb-6">
        <div className="bg-white border border-[#E8E2D6] p-5 rounded-2xl shadow-xs">
          <h3 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-700" />
            <span>تۆمارکردنی خەرجی نوێ</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Field: جۆر (ئالف، دەرمان، نێرگەلە، بەنزین، خۆم، هیتر) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                جۆری خەرجی *
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['ئالف', 'دەرمان', 'نێرگەلە', 'بەنزین', 'خۆم', 'هیتر'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setType(cat)}
                    className={`py-2 px-1 text-xs font-bold rounded-xl border transition cursor-pointer text-center ${
                      type === cat
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                        : 'bg-[#FAF8F5] text-slate-700 border-[#E8E2D6] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Field: بڕ (دينار) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                بڕی خەرجی (دینار) *
              </label>
              <input
                type="number"
                required
                step="500"
                placeholder="بۆ نموونە: 25000"
                value={amount}
                onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                className="w-full text-base font-bold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field: ڕێکەوت */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                ڕێکەوت
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-sm font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field: تێبینی */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                تێبینی
              </label>
              <input
                type="text"
                placeholder="وردەکاری خەرجی بنووسە..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-sm font-medium px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Footer button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#2D5A3F] hover:bg-[#254A34] text-white font-bold text-base rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>زیادکردنی خەرجی</span>
            </button>
          </form>

          {showSuccessToast && (
            <div className="mt-3 p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-sm font-bold flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-600" />
              <span>خەرجی نوێ بە سەرکەوتوویی تۆمارکرا</span>
            </div>
          )}
        </div>
      </div>

      {/* Expenses History List with Filter */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-800">لیستی خەرجییەکان</h3>
          <span className="text-xs font-bold text-slate-500 font-mono">
            {toKurdishDigits(filteredExpenses.length)} خەرجی
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
          {['هەموو', 'ئالف', 'دەرمان', 'نێرگەلە', 'بەنزین', 'خۆم', 'هیتر'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition cursor-pointer border ${
                selectedFilter === cat
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-600 border-[#E8E2D6] hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-2.5">
          {filteredExpenses.map((exp) => (
            <div
              key={exp.id}
              className="bg-white border border-[#E8E2D6] p-4 rounded-2xl shadow-xs flex items-center justify-between hover:border-slate-300 transition"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border ${
                    exp.type === 'نێرگەلە' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                    exp.type === 'بەنزین' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                    'bg-[#FFF0E2] text-[#8C3E14] border-[#F5CFB5]'
                  }`}>
                    {exp.type}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{exp.date}</span>
                </div>
                {exp.notes && <p className="text-xs text-slate-600 font-medium mt-1.5">{exp.notes}</p>}
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono font-black text-base text-rose-700" dir="ltr">
                  {toKurdishDigits(exp.amount)} د.ع
                </span>
                <button
                  onClick={() => onDeleteExpense(exp.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 cursor-pointer transition"
                  title="سڕینەوە"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
