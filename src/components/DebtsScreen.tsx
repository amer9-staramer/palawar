import React, { useState } from 'react';
import { DebtRecord } from '../types';
import { toKurdishDigits } from '../utils/formatters';
import {
  Menu,
  CreditCard,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Check,
  ArrowDownLeft,
  ArrowUpRight,
  History,
  ChevronDown,
  ChevronUp,
  Search,
  Wallet
} from 'lucide-react';

interface DebtsScreenProps {
  debts: DebtRecord[];
  onAddDebt: (d: Omit<DebtRecord, 'id' | 'isSettled'>) => void;
  onRepayDebt?: (debtId: string, amount: number, date: string, notes?: string) => void;
  onAddExistingDebt?: (debtId: string, additionalAmount: number, date: string, notes?: string) => void;
  onToggleSettled: (id: string) => void;
  onDeleteDebt: (id: string) => void;
  onOpenDrawer: () => void;
}

export const DebtsScreen: React.FC<DebtsScreenProps> = ({
  debts,
  onAddDebt,
  onRepayDebt,
  onAddExistingDebt,
  onToggleSettled,
  onDeleteDebt,
  onOpenDrawer
}) => {
  // Mode: 'repay' (دانەوەی قەرز) or 'add' (زیادکردنی قەرز)
  const [activeTab, setActiveTab] = useState<'repay' | 'add'>('repay');

  // Repayment form state
  const [selectedDebtorId, setSelectedDebtorId] = useState<string>('');
  const [repayAmount, setRepayAmount] = useState<number | ''>('');
  const [repayDate, setRepayDate] = useState('2026-09-19');
  const [repayNotes, setRepayNotes] = useState('');

  // Add/Increase Debt form state
  const [addMode, setAddMode] = useState<'new_person' | 'existing_person'>('new_person');
  const [existingDebtId, setExistingDebtId] = useState<string>('');
  const [debtType, setDebtType] = useState<'borrowed' | 'lent'>('borrowed');
  const [personName, setPersonName] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [date, setDate] = useState('2026-09-19');
  const [notes, setNotes] = useState('');

  // UI helpers
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unsettled' | 'borrowed' | 'lent' | 'settled'>('all');
  const [expandedDebtId, setExpandedDebtId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Aggregates based on remainingAmount:
  const lentUnsettled = debts
    .filter((d) => d.type === 'lent' && !d.isSettled)
    .reduce((acc, d) => acc + (d.remainingAmount !== undefined ? d.remainingAmount : d.amount), 0);

  const borrowedUnsettled = debts
    .filter((d) => d.type === 'borrowed' && !d.isSettled)
    .reduce((acc, d) => acc + (d.remainingAmount !== undefined ? d.remainingAmount : d.amount), 0);

  const totalRepaidAmount = debts.reduce((acc, d) => {
    const list = d.repayments || [];
    return acc + list.reduce((sub, r) => sub + r.amount, 0);
  }, 0);

  // Selected debtor for repayment
  const selectedDebtor = debts.find((d) => d.id === selectedDebtorId);
  const selectedDebtorRemaining = selectedDebtor
    ? selectedDebtor.remainingAmount !== undefined
      ? selectedDebtor.remainingAmount
      : selectedDebtor.amount
    : 0;

  // Selected existing debtor for adding debt
  const selectedExistingDebtor = debts.find((d) => d.id === existingDebtId);

  // Handler for Repayment
  const handleRepaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDebtorId || !repayAmount || Number(repayAmount) <= 0) {
      alert('تکایە کەسی قەرزدار و بڕی دانەوە دیاری بکە');
      return;
    }

    if (onRepayDebt) {
      onRepayDebt(selectedDebtorId, Number(repayAmount), repayDate, repayNotes);
    }

    showToast(`بڕی ${toKurdishDigits(repayAmount)} دینار لە قەرزی ${selectedDebtor?.personName} کەمکرایەوە`);
    setRepayAmount('');
    setRepayNotes('');
  };

  // Handler for Adding Debt
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (addMode === 'existing_person') {
      if (!existingDebtId || !amount || Number(amount) <= 0) {
        alert('تکایە کەسێک هەڵبژێرە و بڕی قەرز بنووسە');
        return;
      }
      if (onAddExistingDebt) {
        onAddExistingDebt(existingDebtId, Number(amount), date, notes);
      }
      showToast(`بڕی ${toKurdishDigits(amount)} دینار بۆ قەرزی ${selectedExistingDebtor?.personName} زیادکرا`);
    } else {
      if (!personName.trim() || !amount || Number(amount) <= 0) {
        alert('تکایە ناوی کەس و بڕی قەرز بنووسە');
        return;
      }

      onAddDebt({
        type: debtType,
        personName: personName.trim(),
        amount: Number(amount),
        remainingAmount: Number(amount),
        date: date || '2026-09-19',
        notes: notes.trim(),
        repayments: []
      });
      showToast(`قەرزی نوێ بۆ ${personName.trim()} بە سەرکەوتوویی تۆمارکرا`);
    }

    setPersonName('');
    setAmount('');
    setNotes('');
  };

  // Filtered debts list
  const filteredDebts = debts.filter((d) => {
    const matchesSearch =
      d.personName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.notes && d.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterType === 'unsettled') return !d.isSettled;
    if (filterType === 'settled') return d.isSettled;
    if (filterType === 'borrowed') return d.type === 'borrowed';
    if (filterType === 'lent') return d.type === 'lent';
    return true;
  });

  return (
    <div className="min-h-full bg-[#FBF9F5] text-slate-800 font-['Vazirmatn',sans-serif] pb-16">
      {/* Mobile Top Header */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between">
        <button
          onClick={onOpenDrawer}
          className="w-10 h-10 rounded-xl bg-white border border-[#E8E2D6] shadow-xs flex items-center justify-center text-slate-700 hover:bg-[#F3EFE7] cursor-pointer transition"
        >
          <Menu className="w-5 h-5 text-slate-800" />
        </button>

        <h1 className="text-xl font-black text-slate-900 tracking-tight">
          قەرزەکان
        </h1>
      </div>

      {/* Subtitle Header */}
      <div className="px-5 pt-1 pb-4">
        <h2 className="text-2xl font-black text-slate-900">بەڕێوەبردنی قەرزەکان</h2>
        <p className="text-xs text-slate-500 font-medium">
          تۆمارکردن، زیادکردن و دانەوەی قەرزەکان بە شێوازی ورد
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="px-5 grid grid-cols-2 gap-3 mb-3">
        {/* Card 1: قەرزی داومە (ماوە) */}
        <div className="bg-[#DCECD8] border border-[#B9DDB2] p-3.5 rounded-2xl shadow-xs text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <ArrowUpRight className="w-4 h-4 text-[#194B22]" />
            <span className="text-xs font-bold text-[#205128]">
              قەرزی داومە (ماوە)
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#194B22] font-mono mt-0.5" dir="ltr">
            {toKurdishDigits(lentUnsettled)}
          </div>
          <span className="text-[10px] text-[#33683A] font-semibold">دینار بە دەست خەڵکەوە</span>
        </div>

        {/* Card 2: قەرزی لەسەرم (ماوە) */}
        <div className="bg-[#FFE5CF] border border-[#F6CBB0] p-3.5 rounded-2xl shadow-xs text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <ArrowDownLeft className="w-4 h-4 text-[#7A330E]" />
            <span className="text-xs font-bold text-[#8C3E14]">
              قەرزی لەسەرم (ماوە)
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#7A330E] font-mono mt-0.5" dir="ltr">
            {toKurdishDigits(borrowedUnsettled)}
          </div>
          <span className="text-[10px] text-[#9A4C22] font-semibold">دینار لەسەر کێڵگە</span>
        </div>
      </div>

      {/* Repaid aggregate banner */}
      <div className="px-5 mb-5">
        <div className="bg-white border border-[#E8E2D6] px-4 py-2.5 rounded-xl shadow-xs flex items-center justify-between text-xs">
          <span className="text-slate-600 font-bold flex items-center gap-1.5">
            <Wallet className="w-4 h-4 text-emerald-700" />
            <span>کۆی ئەو قەرزانەی دراونەتەوە (گەڕاوەتەوە):</span>
          </span>
          <span className="font-mono font-black text-emerald-700 text-sm" dir="ltr">
            {toKurdishDigits(totalRepaidAmount)} د.ع
          </span>
        </div>
      </div>

      {/* Primary Action Tabs: دانەوەی قەرز vs زیادکردنی قەرز */}
      <div className="px-5 mb-4">
        <div className="bg-[#EFE9DF] p-1 rounded-2xl flex items-center border border-[#E0D8CA]">
          <button
            onClick={() => setActiveTab('repay')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'repay'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowDownLeft className="w-4 h-4" />
            <span>دانەوەی قەرز (کەمکردنەوە)</span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'add'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>زیادکردنی قەرز</span>
          </button>
        </div>
      </div>

      {/* FORM 1: دانەوەی قەرز (Repayment Form) */}
      {activeTab === 'repay' && (
        <div className="px-5 mb-6">
          <div className="bg-white border-2 border-[#C9DEC4] p-5 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between mb-3 border-b border-[#E8E2D6] pb-2">
              <h3 className="text-sm font-bold text-[#1E4D24] flex items-center gap-2">
                <ArrowDownLeft className="w-4 h-4 text-[#1E4D24]" />
                <span>دانەوەی قەرز / کەمکردنەوە لە قەرز</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-semibold">بڕی دراوە دەبڕدرێت</span>
            </div>

            <form onSubmit={handleRepaySubmit} className="space-y-3.5">
              {/* Field: هەڵبژاردنی کەسی قەرزدار */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  کەسێک لەوانەی قەرزدارن هەڵبژێرە *
                </label>
                <select
                  required
                  value={selectedDebtorId}
                  onChange={(e) => setSelectedDebtorId(e.target.value)}
                  className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
                >
                  <option value="">-- ناوی کەسێک هەڵبژێرە --</option>
                  {debts.map((d) => {
                    const rem = d.remainingAmount !== undefined ? d.remainingAmount : d.amount;
                    return (
                      <option key={d.id} value={d.id}>
                        {d.personName} ({d.type === 'borrowed' ? 'لەسەرمە' : 'داومە'}) - ماوە: {toKurdishDigits(rem)} د.ع {d.isSettled ? '✓ تەسوویەکراو' : ''}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Selected Debtor Status Card */}
              {selectedDebtor && (
                <div className="bg-[#FAF7F0] border border-[#E8DFCF] p-3 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-800">
                      {selectedDebtor.personName}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        selectedDebtor.type === 'borrowed'
                          ? 'bg-[#FFE5CF] text-[#8C3E14]'
                          : 'bg-[#DCECD8] text-[#205128]'
                      }`}
                    >
                      {selectedDebtor.type === 'borrowed' ? 'قەرزم کردووە (لەسەرمە)' : 'قەرزم داوە (داومە)'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">قەرزی ئێستای ماوە:</span>
                    <span className="font-mono font-black text-rose-700 text-sm" dir="ltr">
                      {toKurdishDigits(selectedDebtorRemaining)} د.ع
                    </span>
                  </div>

                  {selectedDebtor.isSettled && (
                    <div className="text-[11px] text-emerald-700 font-bold mt-1">
                      ئەم قەرزە پێشتر تەسوویە کراوە بەڵام دەتوانیت دانەوەی زیاتر تۆمار بکەیت.
                    </div>
                  )}
                </div>
              )}

              {/* Field: بڕی پارەی دانەوە */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    بڕی پارەی دانەوە (دینار) *
                  </label>
                  {selectedDebtor && selectedDebtorRemaining > 0 && (
                    <button
                      type="button"
                      onClick={() => setRepayAmount(selectedDebtorRemaining)}
                      className="text-[11px] text-emerald-700 font-bold hover:underline cursor-pointer"
                    >
                      دانەوەی هەمووی ({toKurdishDigits(selectedDebtorRemaining)})
                    </button>
                  )}
                </div>
                <input
                  type="number"
                  required
                  step="5000"
                  placeholder="بۆ نموونە: 100000"
                  value={repayAmount}
                  onChange={(e) => setRepayAmount(e.target.value ? Number(e.target.value) : '')}
                  className="w-full text-sm font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
                />
              </div>

              {/* Quick Amount Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {[25000, 50000, 100000, 250000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRepayAmount(val)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold rounded-lg cursor-pointer"
                  >
                    +{toKurdishDigits(val)}
                  </button>
                ))}
              </div>

              {/* Field: ڕێکەوت */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ڕێکەوتی دانەوە *
                </label>
                <input
                  type="date"
                  required
                  value={repayDate}
                  onChange={(e) => setRepayDate(e.target.value)}
                  className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
                />
              </div>

              {/* Field: تێبینی */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  تێبینی دانەوە (ئیختیاری)
                </label>
                <input
                  type="text"
                  placeholder="وەک: قیستی یەکەم، دراوە بە نەقد، حەواڵە..."
                  value={repayNotes}
                  onChange={(e) => setRepayNotes(e.target.value)}
                  className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#205128] hover:bg-[#194B22] text-white font-bold text-sm rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-2"
              >
                <ArrowDownLeft className="w-4 h-4" />
                <span>تۆمارکردنی دانەوەی قەرز (کەمکردنەوە)</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FORM 2: زیادکردنی قەرز (Add / Increase Debt Form) */}
      {activeTab === 'add' && (
        <div className="px-5 mb-6">
          <div className="bg-white border border-[#E8E2D6] p-5 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between mb-3 border-b border-[#E8E2D6] pb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-700" />
                <span>قەرزی نوێ یان زیادکردن بۆ کەسێک</span>
              </h3>
            </div>

            {/* Mode: New Person vs Existing Person */}
            <div className="flex items-center gap-2 mb-4">
              <button
                type="button"
                onClick={() => setAddMode('new_person')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg border cursor-pointer ${
                  addMode === 'new_person'
                    ? 'bg-[#2D5A3F] text-white border-[#2D5A3F]'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                کەسی نوێ
              </button>
              <button
                type="button"
                onClick={() => setAddMode('existing_person')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg border cursor-pointer ${
                  addMode === 'existing_person'
                    ? 'bg-[#2D5A3F] text-white border-[#2D5A3F]'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                زیادکردن بۆ کەسی پێشوو
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              {addMode === 'existing_person' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    کەسی تۆمارکراو هەڵبژێرە *
                  </label>
                  <select
                    required
                    value={existingDebtId}
                    onChange={(e) => setExistingDebtId(e.target.value)}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
                  >
                    <option value="">-- کەسێک هەڵبژێرە --</option>
                    {debts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.personName} ({d.type === 'borrowed' ? 'لەسەرمە' : 'داومە'}) - قەرزی ئێستا: {toKurdishDigits(d.remainingAmount ?? d.amount)} د.ع
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <>
                  {/* Field: جۆر */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      جۆری قەرز *
                    </label>
                    <select
                      value={debtType}
                      onChange={(e) => setDebtType(e.target.value as any)}
                      className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
                    >
                      <option value="borrowed">قەرزم کردووە (لەسەرمە)</option>
                      <option value="lent">قەرزم داوە (داومە)</option>
                    </select>
                  </div>

                  {/* Field: ناوى كه س */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ناوی کەس *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="بۆ نموونە: مەریوان کاکە"
                      value={personName}
                      onChange={(e) => setPersonName(e.target.value)}
                      className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
                    />
                  </div>
                </>
              )}

              {/* Field: بڕ (دينار) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {addMode === 'existing_person' ? 'بڕی قەرزی زیادکراو (دینار) *' : 'بڕی قەرز (دینار) *'}
                </label>
                <input
                  type="number"
                  required
                  step="5000"
                  placeholder="بۆ نموونە: 350000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                  className="w-full text-sm font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
                />
              </div>

              {/* Field: ڕێکەوت */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ڕێکەوت *
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
                />
              </div>

              {/* Field: تێبینی */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  تێبینی
                </label>
                <input
                  type="text"
                  placeholder="هۆکار یان وردەکاری قەرزەکە بنووسە..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#2D5A3F] hover:bg-[#254A34] text-white font-bold text-sm rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{addMode === 'existing_person' ? 'تۆمارکردنی زیادکردنی قەرز' : 'تۆمارکردنی قەرزی نوێ'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast message */}
      {toastMessage && (
        <div className="px-5 mb-4">
          <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs">
            <Check className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Debts List Header & Filters */}
      <div className="px-5 mb-3">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-sm font-bold text-slate-900">لیستی قەرزەکان</h3>
          <span className="text-xs text-slate-500 font-bold">
            {toKurdishDigits(filteredDebts.length)} قەرزدار
          </span>
        </div>

        {/* Search Input */}
        <div className="relative mb-2.5">
          <input
            type="text"
            placeholder="گەڕان بەپێی ناوی کەس..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs font-medium pl-8 pr-3.5 py-2 bg-white border border-[#E8E2D6] rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'هەمووی' },
            { id: 'unsettled', label: 'ماوە (نەدراوە)' },
            { id: 'borrowed', label: 'لەسەرمە' },
            { id: 'lent', label: 'داومە' },
            { id: 'settled', label: 'تەسوویەکراو' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id as any)}
              className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
                filterType === f.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-[#E8E2D6] hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Debts Cards List */}
      <div className="px-5 space-y-3">
        {filteredDebts.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-2xl border border-[#E8E2D6] text-slate-400 text-xs">
            هیچ قەرزێک بەم پێوەرانە نەدۆزرایەوە
          </div>
        ) : (
          filteredDebts.map((d) => {
            const remaining = d.remainingAmount !== undefined ? d.remainingAmount : d.amount;
            const repaidList = d.repayments || [];
            const totalRepaidForThis = repaidList.reduce((acc, r) => acc + r.amount, 0);
            const isExpanded = expandedDebtId === d.id;

            return (
              <div
                key={d.id}
                className="bg-white border border-[#E8E2D6] p-4 rounded-2xl shadow-xs transition hover:border-slate-300"
              >
                {/* Header Row: Name, Badge, Status */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-base text-slate-900 font-bold">
                        {d.personName}
                      </strong>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-md font-bold ${
                          d.type === 'borrowed'
                            ? 'bg-[#FFE5CF] text-[#8C3E14]'
                            : 'bg-[#DCECD8] text-[#205128]'
                        }`}
                      >
                        {d.type === 'borrowed' ? 'لەسەرمە' : 'داومە'}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 mt-0.5">
                      ڕێکەوت: <span className="font-mono text-slate-700">{d.date}</span>{' '}
                      {d.notes ? `• ${d.notes}` : ''}
                    </div>
                  </div>

                  {/* Settle Badge */}
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border ${
                      d.isSettled
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {d.isSettled ? 'تەسوویە کراوە' : 'تەسوویە نەکراوە'}
                  </span>
                </div>

                {/* Amount Row: Prominent Remaining Amount */}
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EDE5D8] my-2.5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 font-bold block">
                        قەرزی ماوە (نەدراوە):
                      </span>
                      <span
                        className={`text-xl font-black font-mono ${
                          remaining === 0
                            ? 'text-emerald-700'
                            : d.type === 'borrowed'
                            ? 'text-[#8C3E14]'
                            : 'text-[#194B22]'
                        }`}
                        dir="ltr"
                      >
                        {toKurdishDigits(remaining)} د.ع
                      </span>
                    </div>

                    <div className="text-left text-xs font-semibold text-slate-500">
                      <div>کۆی قەرز: <span className="font-mono font-bold text-slate-800" dir="ltr">{toKurdishDigits(d.amount)}</span></div>
                      {totalRepaidForThis > 0 && (
                        <div className="text-emerald-700 font-bold">
                          دراوەتەوە: <span className="font-mono" dir="ltr">{toKurdishDigits(totalRepaidForThis)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress bar if partially repaid */}
                  {d.amount > 0 && (
                    <div className="mt-2 w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min(100, Math.round((totalRepaidForThis / d.amount) * 100))}%`
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    {/* Quick Repay Button */}
                    <button
                      onClick={() => {
                        setSelectedDebtorId(d.id);
                        setActiveTab('repay');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 bg-[#DCECD8] hover:bg-[#CFE5CA] text-[#1E4D24] text-xs font-bold rounded-xl border border-[#B8DCB1] shadow-2xs cursor-pointer flex items-center gap-1"
                    >
                      <ArrowDownLeft className="w-3.5 h-3.5" />
                      <span>دانەوەی قەرز</span>
                    </button>

                    {/* Toggle Settled Status */}
                    <button
                      onClick={() => onToggleSettled(d.id)}
                      className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border cursor-pointer transition ${
                        d.isSettled
                          ? 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                          : 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                      }`}
                    >
                      {d.isSettled ? 'نەکراوە' : 'تەسوویەکردن'}
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Repayment History Dropdown */}
                    {repaidList.length > 0 && (
                      <button
                        onClick={() => setExpandedDebtId(isExpanded ? null : d.id)}
                        className="p-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl cursor-pointer flex items-center gap-1"
                        title="مێژووی دانەوەکان"
                      >
                        <History className="w-3.5 h-3.5 text-slate-500" />
                        <span className="font-bold font-mono text-[11px]">
                          {toKurdishDigits(repaidList.length)}
                        </span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    )}

                    {/* Delete Debt */}
                    <button
                      onClick={() => {
                        if (confirm(`ئایا دڵنیایت لە سڕینەوەی قەرزی ${d.personName}؟`)) {
                          onDeleteDebt(d.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 cursor-pointer"
                      title="سڕینەوە"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Repayment History */}
                {isExpanded && repaidList.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-dashed border-slate-200">
                    <h5 className="text-[11px] font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                      <History className="w-3.5 h-3.5 text-emerald-700" />
                      <span>مێژووی دانەوەکانی ئەم کەسە:</span>
                    </h5>
                    <div className="space-y-1.5">
                      {repaidList.map((r) => (
                        <div
                          key={r.id}
                          className="bg-[#F4F9F2] border border-[#D5EAD0] p-2 rounded-lg flex items-center justify-between text-xs"
                        >
                          <div>
                            <span className="font-bold text-emerald-800 font-mono" dir="ltr">
                              +{toKurdishDigits(r.amount)} د.ع
                            </span>
                            {r.notes && (
                              <span className="text-slate-600 text-[11px] mr-2">
                                ({r.notes})
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-slate-500 text-[11px]">
                            {r.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
