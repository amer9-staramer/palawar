import React from 'react';
import { SaleRecord } from '../types';
import { toKurdishDigits } from '../utils/formatters';
import {
  Menu,
  Phone,
  Calendar,
  MapPin,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Truck,
  PackageOpen
} from 'lucide-react';

interface SaleDetailsScreenProps {
  sales: SaleRecord[];
  onUpdateStatus: (id: string, status: 'order_pending' | 'arrived' | 'cancelled') => void;
  onDeleteSale: (id: string) => void;
  onOpenDrawer: () => void;
}

export const SaleDetailsScreen: React.FC<SaleDetailsScreenProps> = ({
  sales = [],
  onUpdateStatus,
  onDeleteSale,
  onOpenDrawer
}) => {
  return (
    <div className="min-h-full bg-[#FAF7F2] text-[#2D2A26] font-['Vazirmatn','Alexandria',sans-serif] pb-16">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <button
          onClick={onOpenDrawer}
          className="w-10 h-10 rounded-2xl bg-white border border-[#E8E1D5] shadow-xs flex items-center justify-center text-slate-700 hover:bg-[#F3EFE7] cursor-pointer transition active:scale-95"
          aria-label="کردنەوەی مینیو"
        >
          <Menu className="w-5 h-5 text-slate-800" />
        </button>

        <h1 className="text-xl font-black text-[#1F1D1A] tracking-tight">
          ناردنەکان
        </h1>
      </div>

      {/* Sub Header */}
      <div className="px-5 pt-1 pb-4">
        <h2 className="text-2xl font-black text-[#1F1D1A]">
          ناردنەکان (بار و فرۆشتن)
        </h2>
        <p className="text-xs text-[#8A857D] font-medium">
          وردەکاری بارە نێردراوەکان و فرۆشتنی چاوەڕوانکراو
        </p>
      </div>

      {/* Dynamic List */}
      <div className="px-5 space-y-3.5">
        {sales.length === 0 ? (
          <div className="bg-white border border-[#EDE6DC] rounded-3xl p-8 text-center shadow-xs my-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF0E2] text-[#E89E73] flex items-center justify-center mx-auto mb-3">
              <PackageOpen className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              هیچ ناردن یان فرۆشتنێک تۆمار نەکراوە
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              ئێستا لیستەکە بەتاڵ و سفرە. دەتوانیت لە بەشی «فرۆشتن» یەکەم فرۆشتن یان ئۆردەر بەدەست تۆمار بکەیت.
            </p>
          </div>
        ) : (
          sales.map((item) => {
            const isArrived = item.arrived || item.status === 'arrived';
            const isCancelled = item.status === 'cancelled';
            const isPending = !isArrived && !isCancelled;

            const cardBg = isArrived
              ? 'bg-[#EBF5E9] border-[#C8E4C2]'
              : isCancelled
              ? 'bg-rose-50 border-rose-200'
              : 'bg-[#FEECE2] border-[#FADCD0]';

            const textColor = isArrived
              ? 'text-[#194B22]'
              : isCancelled
              ? 'text-rose-900'
              : 'text-[#7A330E]';

            return (
              <div
                key={item.id}
                className={`${cardBg} border rounded-2xl p-4 shadow-xs transition`}
              >
                {/* Top Row: Amount & Status Tag */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-2xl font-black ${textColor} font-mono`} dir="ltr">
                        {toKurdishDigits(item.totalAmount)}
                      </span>
                      <span className="text-xs font-bold opacity-80 font-mono" dir="ltr">
                        {toKurdishDigits(item.pricePerChick)} @
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">
                      {toKurdishDigits(item.chicksCount)} جووت - {item.city || 'دەربەندیخان'}
                    </p>
                  </div>

                  {/* Status Badge */}
                  {isArrived && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#C8E4C2] text-[#194B22] border border-[#A6D49D] flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-[#194B22]" />
                      <span>گەیشت</span>
                    </span>
                  )}
                  {isCancelled && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5 text-rose-700" />
                      <span>کانسڵ</span>
                    </span>
                  )}
                  {isPending && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F8D5BD] text-[#7A330E] border border-[#EAA678] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#7A330E]" />
                      <span>ناردن - چاوەڕوان</span>
                    </span>
                  )}
                </div>

                {/* Details box */}
                <div className="text-xs text-slate-700 space-y-1.5 my-3 bg-white/70 p-3 rounded-xl border border-black/5">
                  {item.customerName && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">کڕیار:</span>
                      <span className="font-bold text-slate-900">{item.customerName}</span>
                    </div>
                  )}
                  {item.phone && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">مۆبایل:</span>
                      <span className="font-mono font-bold text-slate-900">{item.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">ڕێکەوت:</span>
                    <span className="font-mono text-slate-800">{item.date}</span>
                  </div>
                  {item.driver && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">سایەق:</span>
                      <span className="text-slate-800 font-medium">{item.driver}</span>
                    </div>
                  )}
                  {item.notes && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">تێبینی:</span>
                      <span className="text-slate-800">{item.notes}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-black/5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      onClick={() => onUpdateStatus(item.id, 'order_pending')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition cursor-pointer ${
                        isPending
                          ? 'bg-white text-slate-900 font-black shadow-xs border-slate-300'
                          : 'bg-white/60 hover:bg-white text-slate-700 border-transparent'
                      }`}
                    >
                      لە ناردندایە
                    </button>
                    <button
                      onClick={() => onUpdateStatus(item.id, 'arrived')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition cursor-pointer ${
                        isArrived
                          ? 'bg-[#C8E4C2] text-[#194B22] font-black border-[#A6D49D]'
                          : 'bg-white/60 hover:bg-[#DCECD8] text-[#1E4D24] border-transparent'
                      }`}
                    >
                      گەیشت
                    </button>
                    <button
                      onClick={() => onUpdateStatus(item.id, 'cancelled')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition cursor-pointer ${
                        isCancelled
                          ? 'bg-rose-100 text-rose-800 font-black border-rose-300'
                          : 'bg-white/60 hover:bg-rose-50 text-rose-800 border-transparent'
                      }`}
                    >
                      کانسڵ
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      if (window.confirm('ئایا دڵنیایت لە سڕینەوەی ئەم تۆمارە؟')) {
                        onDeleteSale(item.id);
                      }
                    }}
                    className="p-2 bg-white text-rose-500 hover:text-rose-700 rounded-xl border border-rose-200 cursor-pointer transition shadow-2xs"
                    title="سڕینەوە"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
