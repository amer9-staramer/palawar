import React from 'react';
import { NavTab } from '../types';
import {
  LayoutDashboard,
  ShoppingCart,
  TrendingUp,
  PackageCheck,
  CalendarCheck,
  Wallet,
  Skull,
  Receipt,
  CreditCard,
  Truck,
  BarChart3,
  Calculator,
  X,
  User,
  ChevronLeft
} from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onResetAllData?: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  onResetAllData
}) => {
  if (!isOpen) return null;

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'سەرەکی', icon: <LayoutDashboard className="w-4.5 h-4.5 text-emerald-700" /> },
    { id: 'purchases', label: 'کڕینەکان', icon: <ShoppingCart className="w-4.5 h-4.5 text-emerald-700" /> },
    { id: 'sales', label: 'فرۆشتنەکان', icon: <TrendingUp className="w-4.5 h-4.5 text-emerald-700" /> },
    { id: 'sale_details', label: 'ناردنەکان', icon: <PackageCheck className="w-4.5 h-4.5 text-emerald-700" /> },
    { id: 'preorders', label: 'داواکاری پێشوەختە', icon: <CalendarCheck className="w-4.5 h-4.5 text-emerald-700" /> },
    { id: 'wallet', label: 'جزدان و مایە', icon: <Wallet className="w-4.5 h-4.5 text-emerald-700" /> },
    { id: 'mortality', label: 'مرداربوون', icon: <Skull className="w-4.5 h-4.5 text-rose-600" /> },
    { id: 'expenses', label: 'خەرجییەکان', icon: <Receipt className="w-4.5 h-4.5 text-amber-700" /> },
    { id: 'debts', label: 'قەرزەکان', icon: <CreditCard className="w-4.5 h-4.5 text-blue-700" /> },
    { id: 'drivers', label: 'سایەقەکان', icon: <Truck className="w-4.5 h-4.5 text-emerald-700" /> },
    { id: 'reports', label: 'ڕاپۆرتەکان', icon: <BarChart3 className="w-4.5 h-4.5 text-emerald-700" /> },
    { id: 'calculator', label: 'ژمێرەر', icon: <Calculator className="w-4.5 h-4.5 text-emerald-700" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-stretch">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container (RTL sliding from right) */}
      <div className="relative w-[310px] max-w-[85vw] bg-[#FAF8F5] text-slate-800 shadow-2xl z-10 flex flex-col justify-between overflow-y-auto border-l border-[#E6E0D4] font-['Vazirmatn',sans-serif]">
        {/* Drawer Header with Profile */}
        <div className="p-5 border-b border-[#E8E2D6] bg-[#F4F0E8]/70">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-[#E2EBD8] border border-[#BFD9AD] flex items-center justify-center text-emerald-900 shadow-xs">
              <User className="w-6 h-6" />
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/80 border border-[#DDD5C7] flex items-center justify-center text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <h2 className="text-xl font-black text-slate-900">پەلەوەری گەرمیان</h2>
            <p className="text-xs text-slate-600 mt-0.5">بەڕێوەبەری کێڵگەی پەلەوەر</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="py-3 px-3 space-y-1.5 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-[#E3EFE0] text-emerald-950 shadow-xs border border-[#C5DEC0]'
                    : 'text-slate-700 hover:bg-[#F2ECE1] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-white shadow-xs' : 'bg-[#EFE9DD]'}`}>
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </div>
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              </button>
            );
          })}
        </div>

        {/* Drawer Footer with Reset Option */}
        <div className="p-4 border-t border-[#E8E2D6] bg-[#F5F0E6]/60 space-y-3">
          {onResetAllData && (
            <button
              onClick={() => {
                onClose();
                onResetAllData();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100 cursor-pointer transition active:scale-98"
            >
              <span>سفرکردنەوەی هەموو داتاکان (پاککردنەوە)</span>
            </button>
          )}

          <div className="text-center text-[11px] text-slate-500">
            <p className="font-medium text-slate-600">كێڵگه ى په له وهرى رێگا</p>
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              سیستەمی ژمێریاری و کۆگا • وەشانی نوێ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
