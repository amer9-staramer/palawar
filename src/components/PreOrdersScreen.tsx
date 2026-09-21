import React, { useState } from 'react';
import { PreOrderRecord } from '../types';
import { toKurdishDigits } from '../utils/formatters';
import { Menu, Plus, CalendarCheck, CheckCircle2, Clock, Trash2, Check } from 'lucide-react';

interface PreOrdersScreenProps {
  preOrders: PreOrderRecord[];
  onAddPreOrder: (order: Omit<PreOrderRecord, 'id'>) => void;
  onUpdateStatus: (id: string, status: 'waiting' | 'completed') => void;
  onDeletePreOrder: (id: string) => void;
  onOpenDrawer: () => void;
}

export const PreOrdersScreen: React.FC<PreOrdersScreenProps> = ({
  preOrders,
  onAddPreOrder,
  onUpdateStatus,
  onDeletePreOrder,
  onOpenDrawer
}) => {
  const [personName, setPersonName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [chicksCount, setChicksCount] = useState<number | ''>('');
  const [date, setDate] = useState('2026-09-19');
  const [notes, setNotes] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const completedCount = preOrders.filter((o) => o.status === 'completed').length;
  const waitingCount = preOrders.filter((o) => o.status === 'waiting').length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName.trim()) {
      alert('تکایە ناوی کەس بنووسە');
      return;
    }

    onAddPreOrder({
      personName: personName.trim(),
      city: city.trim() || 'هەولێر',
      phone: phone.trim(),
      chicksCount: chicksCount ? Number(chicksCount) : undefined,
      date: date || '2026-09-19',
      notes: notes.trim(),
      status: 'waiting'
    });

    setPersonName('');
    setCity('');
    setPhone('');
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
          داواكارى پيشوخته
        </h1>
      </div>

      {/* Subtitle */}
      <div className="px-5 pt-1 pb-4">
        <h2 className="text-lg font-black text-slate-900">داواكارى پيشوخته</h2>
        <p className="text-xs text-slate-500 font-medium">
          ئه و كه سانه ى داواكاريان پيشوخته تؤماركردووه
        </p>
      </div>

      {/* Summary Cards: جێبه جێكراو and چاوه روانى پركردنه وه */}
      <div className="px-5 grid grid-cols-2 gap-3 mb-6">
        <div className="bg-[#DCECD8] border border-[#B9DDB2] p-3.5 rounded-2xl shadow-xs text-center">
          <span className="text-xs font-semibold text-[#205128] block">جێبه جێكراو</span>
          <div className="text-xl font-black text-[#194B22] font-mono mt-1">
            {toKurdishDigits(completedCount)}
          </div>
          <span className="text-[10px] text-[#33683A]">داواکاری</span>
        </div>

        <div className="bg-[#FFE5CF] border border-[#F6CBB0] p-3.5 rounded-2xl shadow-xs text-center">
          <span className="text-xs font-semibold text-[#8C3E14] block">چاوه روانى پركردنه وه</span>
          <div className="text-xl font-black text-[#7A330E] font-mono mt-1">
            {toKurdishDigits(waitingCount)}
          </div>
          <span className="text-[10px] text-[#9A4C22]">لە چاوەڕوانیدا</span>
        </div>
      </div>

      {/* Form (image_9.png) with Peach Data Entry Fields */}
      <div className="px-5 mb-6">
        <div className="bg-white border border-[#E8E2D6] p-5 rounded-2xl shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-emerald-700" />
            <span>تۆمارکردنی داواکاری نوێ</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Field 1: ناوى كه س (placeholder 'ناوى ته واو') */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ناوى كه س *
              </label>
              <input
                type="text"
                required
                placeholder="ناوى ته واو"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field 2: شار (placeholder 'بۆ نموونه: هه ولێر') */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                شار
              </label>
              <input
                type="text"
                placeholder="بۆ نموونه: هه ولێر"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field 3: ژماره ى مؤبايل (placeholder '.٧٥...') */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ژماره ى مؤبايل
              </label>
              <input
                type="text"
                placeholder=".٧٥..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field 4: ژماره ى جووت (ئيبتيارى) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ژماره ى جووت (ئيبتيارى)
              </label>
              <input
                type="number"
                placeholder="بۆ نموونە: 50"
                value={chicksCount}
                onChange={(e) => setChicksCount(e.target.value ? Number(e.target.value) : '')}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field 5: رێكه وت (09/19/2026) */}
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

            {/* Field 6: تێبينى (placeholder 'هه ر زانيارييه ك كه ده ته وێت بير بمێنێت...') */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                تێبينى
              </label>
              <textarea
                rows={2}
                placeholder="هه ر زانيارييه ك كه ده ته وێت بير بمێنێت..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

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
              <span>داواکاری پێشوەختە بە سەرکەوتوویی تۆمارکرا</span>
            </div>
          )}
        </div>
      </div>

      {/* Orders List */}
      <div className="px-5">
        <h3 className="text-xs font-bold text-slate-700 mb-2">لیستی داواکارییەکان</h3>
        <div className="space-y-2.5">
          {preOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-[#E8E2D6] p-3.5 rounded-2xl shadow-xs flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-xs text-slate-900 font-bold">{order.personName}</strong>
                  <span className="text-[10px] text-slate-500 bg-[#EFE9DD] px-1.5 py-0.5 rounded-md">
                    {order.city}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                  <span>مۆبایل: {order.phone}</span>
                  {order.chicksCount && (
                    <span className="font-bold text-slate-700">
                      • {toKurdishDigits(order.chicksCount)} جووت
                    </span>
                  )}
                </div>
                {order.notes && <p className="text-[10px] text-slate-400 mt-0.5">{order.notes}</p>}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    onUpdateStatus(order.id, order.status === 'waiting' ? 'completed' : 'waiting')
                  }
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border cursor-pointer ${
                    order.status === 'completed'
                      ? 'bg-[#DCECD8] text-[#194B22] border-[#A6D49D]'
                      : 'bg-[#FFE5CF] text-[#7A330E] border-[#F6CBB0]'
                  }`}
                >
                  {order.status === 'completed' ? 'جێبەجێکرا' : 'چاوەڕوان'}
                </button>

                <button
                  onClick={() => onDeletePreOrder(order.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 cursor-pointer"
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
