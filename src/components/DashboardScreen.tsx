import React from 'react';
import {
  NavTab,
  PurchaseRecord,
  SaleRecord,
  ExpenseRecord,
  WalletTransaction,
  MortalityRecord
} from '../types';
import { toKurdishDigits } from '../utils/formatters';
import {
  TrendingDown,
  TrendingUp,
  Receipt,
  ShoppingCart,
  Boxes,
  Wallet,
  PiggyBank,
  Clock,
  Menu,
  HeartCrack,
  ChevronLeft,
  Coins,
  RotateCcw
} from 'lucide-react';

interface DashboardScreenProps {
  purchases: PurchaseRecord[];
  sales: SaleRecord[];
  expenses: ExpenseRecord[];
  walletTransactions: WalletTransaction[];
  mortalities: MortalityRecord[];
  onOpenDrawer: () => void;
  onNavigate: (tab: NavTab) => void;
  onResetAllData?: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  purchases = [],
  sales = [],
  expenses = [],
  walletTransactions = [],
  mortalities = [],
  onOpenDrawer,
  onNavigate,
  onResetAllData
}) => {
  // 1. Total Chick purchases & Expenses
  const totalPurchasesCost = purchases.reduce((acc, p) => acc + (p.totalAmount || 0), 0);
  const totalExpensesCost = expenses.reduce((acc, e) => acc + (e.amount || 0), 0);
  const totalCombinedExpenses = totalPurchasesCost + totalExpensesCost;

  // 2. Sales and Incomes
  const totalChicksSold = sales
    .filter((s) => s.status !== 'cancelled')
    .reduce((acc, s) => acc + (s.chicksCount || 0), 0);

  const receivedIncome = sales
    .filter((s) => s.arrived || s.status === 'arrived')
    .reduce((acc, s) => acc + (s.totalAmount || 0), 0);

  const pendingIncome = sales
    .filter((s) => !s.arrived && s.status === 'order_pending')
    .reduce((acc, s) => acc + (s.totalAmount || 0), 0);

  const pendingOrdersChicks = sales
    .filter((s) => !s.arrived && s.status === 'order_pending')
    .reduce((acc, s) => acc + (s.chicksCount || 0), 0);

  // 3. Mortalities
  const totalDeadChicks = mortalities.reduce((acc, m) => acc + (m.chicksCount || 0), 0);
  const totalMortalityLoss = mortalities.reduce((acc, m) => acc + (m.estimatedLossIqd || 0), 0);

  // 4. Inventory counts
  const totalChicksBought = purchases.reduce((acc, p) => acc + (p.chicksCount || 0), 0);
  const remainingChicks = Math.max(0, totalChicksBought - totalChicksSold - totalDeadChicks);

  // 5. Wallet Balance
  const walletBalance = walletTransactions.reduce((acc, t) => {
    return t.type === 'add' ? acc + t.amount : acc - t.amount;
  }, 0);
  const totalAddedWallet = walletTransactions
    .filter((t) => t.type === 'add')
    .reduce((acc, t) => acc + t.amount, 0);

  // 6. Net Profit or Loss
  const netBalance = receivedIncome - totalCombinedExpenses - totalMortalityLoss;
  const isLoss = netBalance < 0;
  const displayNetBalance = Math.abs(netBalance);

  return (
    <div className="min-h-full bg-[#FAF7F2] text-[#2D2A26] font-['Vazirmatn','Alexandria',sans-serif] pb-16 select-none">
      {/* Header Greeting Section - Clean, no fake status bar */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#1F1D1A] tracking-tight flex items-center gap-2">
              <span>پەلەوەر</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EFE9DF] text-[#635D52]">
                کێڵگەکەت
              </span>
            </h1>
            <p className="text-xs text-[#8A857D] font-medium mt-0.5 font-sans">
              Monday, September 21, 2026
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onResetAllData && (
              <button
                onClick={onResetAllData}
                title="سفرکردنەوەی هەموو داتاکان"
                className="w-9 h-9 rounded-2xl bg-white border border-[#E8E1D5] shadow-xs flex items-center justify-center text-slate-500 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition active:scale-95 text-xs"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onOpenDrawer}
              className="w-10 h-10 rounded-2xl bg-white border border-[#E8E1D5] shadow-xs flex items-center justify-center text-[#2D2A26] hover:bg-white cursor-pointer transition active:scale-95"
              aria-label="کردنەوەی مینیو"
            >
              <Menu className="w-5 h-5 text-[#2D2A26]" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2x4 Grid of Cards - Dynamically calculated from user data */}
      <div className="px-4 space-y-3.5">
        {/* ROW 1: Both Peach Cards (#FEECE2)
            Right: کۆی خەرجی
            Left: زیان / قازانج
        */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Card 1 (Top Right): کۆی خەرجی */}
          <div
            onClick={() => onNavigate('expenses')}
            className="bg-[#FEECE2] border border-[#FADCD0] p-4 sm:p-5 rounded-[28px] shadow-2xs cursor-pointer hover:opacity-95 transition active:scale-[0.98] flex flex-col justify-between min-h-[140px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-[13px] font-bold text-[#423834]">
                کۆی خەرجی
              </span>
              <div className="text-[#685B54]">
                <Receipt className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>

            <div className="my-1.5 text-center sm:text-right">
              <span className="text-2xl sm:text-[27px] font-black text-[#2B2320] font-mono tracking-tight">
                {toKurdishDigits(totalCombinedExpenses)}
              </span>
            </div>

            <div className="text-[11px] text-[#8C7C74] font-medium">
              دینار
            </div>
          </div>

          {/* Card 2 (Top Left): زیان / قازانج */}
          <div
            onClick={() => onNavigate('reports')}
            className="bg-[#FEECE2] border border-[#FADCD0] p-4 sm:p-5 rounded-[28px] shadow-2xs cursor-pointer hover:opacity-95 transition active:scale-[0.98] flex flex-col justify-between min-h-[140px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-[13px] font-bold text-[#423834]">
                {isLoss ? 'زیان' : 'قازانج'}
              </span>
              <div className="text-[#685B54]">
                {isLoss ? (
                  <TrendingDown className="w-5 h-5 stroke-[1.8]" />
                ) : (
                  <TrendingUp className="w-5 h-5 stroke-[1.8] text-emerald-700" />
                )}
              </div>
            </div>

            <div className="my-1.5 text-center sm:text-right" dir="ltr">
              <span className="text-2xl sm:text-[27px] font-black text-[#2B2320] font-mono tracking-tight">
                {isLoss ? `-${toKurdishDigits(displayNetBalance)}` : toKurdishDigits(displayNetBalance)}
              </span>
            </div>

            <div className="text-[11px] text-[#8C7C74] font-medium truncate">
              {isLoss ? 'دینار — دوای زیان و خەرجی' : 'دینار — قازانجی پاک'}
            </div>
          </div>
        </div>

        {/* ROW 2: Both White Cards (#FFFFFF)
            Right: جووتی فرۆشراو
            Left: جووتی ماوە
        */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Card 3 (Row 2 Right): جووتی فرۆشراو */}
          <div
            onClick={() => onNavigate('sales')}
            className="bg-white border border-[#EDE6DC] p-4 sm:p-5 rounded-[28px] shadow-xs cursor-pointer hover:bg-[#FAF8F5] transition active:scale-[0.98] flex flex-col justify-between min-h-[140px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-[13px] font-bold text-[#3B3835]">
                جووتی فرۆشراو
              </span>
              <div className="text-[#6E6A64]">
                <ShoppingCart className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>

            <div className="my-1.5 text-center sm:text-right">
              <span className="text-2xl sm:text-[28px] font-black text-[#1F1D1A] font-mono tracking-tight">
                {toKurdishDigits(totalChicksSold)}
              </span>
            </div>

            <div className="text-[11px] text-[#8A857D] font-medium truncate">
              لە {toKurdishDigits(totalChicksBought)} جووتی کراو
            </div>
          </div>

          {/* Card 4 (Row 2 Left): جووتی ماوە */}
          <div
            onClick={() => onNavigate('purchases')}
            className="bg-white border border-[#EDE6DC] p-4 sm:p-5 rounded-[28px] shadow-xs cursor-pointer hover:bg-[#FAF8F5] transition active:scale-[0.98] flex flex-col justify-between min-h-[140px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-[13px] font-bold text-[#3B3835]">
                جووتی ماوە
              </span>
              <div className="text-[#6E6A64]">
                <Boxes className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>

            <div className="my-1.5 text-center sm:text-right">
              <span className="text-2xl sm:text-[28px] font-black text-[#1F1D1A] font-mono tracking-tight">
                {toKurdishDigits(remainingChicks)}
              </span>
            </div>

            <div className="text-[11px] text-[#8A857D] font-medium truncate">
              {toKurdishDigits(pendingOrdersChicks)} جووت لە چاوەڕوانیدایە
            </div>
          </div>
        </div>

        {/* ROW 3: Both Green Cards
            Right: جزدانی مایە (Muted Olive Green #567150)
            Left: داهاتی گەیشتوو (Rich Emerald Green #318849)
        */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Card 5 (Row 3 Right): جزدانی مایە */}
          <div
            onClick={() => onNavigate('wallet')}
            className="bg-[#567150] p-4 sm:p-5 rounded-[28px] shadow-xs text-white cursor-pointer hover:opacity-95 transition active:scale-[0.98] flex flex-col justify-between min-h-[140px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-[13px] font-bold text-[#EBF2EA]">
                جزدانی مایە
              </span>
              <div className="text-[#D8E6D6]">
                <PiggyBank className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>

            <div className="my-1.5 text-center sm:text-right">
              <span className="text-2xl sm:text-[27px] font-black text-white font-mono tracking-tight">
                {toKurdishDigits(walletBalance)}
              </span>
            </div>

            <div className="text-[11px] text-[#DCE7DA] font-medium truncate">
              {toKurdishDigits(totalAddedWallet)} زیادکراو
            </div>
          </div>

          {/* Card 6 (Row 3 Left): داهاتی گەیشتوو */}
          <div
            onClick={() => onNavigate('sales')}
            className="bg-[#318849] p-4 sm:p-5 rounded-[28px] shadow-xs text-white cursor-pointer hover:opacity-95 transition active:scale-[0.98] flex flex-col justify-between min-h-[140px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-[13px] font-bold text-[#E4F5E8]">
                داهاتی گەیشتوو
              </span>
              <div className="text-[#D3EED8]">
                <Wallet className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>

            <div className="my-1.5 text-center sm:text-right">
              <span className="text-2xl sm:text-[27px] font-black text-white font-mono tracking-tight">
                {toKurdishDigits(receivedIncome)}
              </span>
            </div>

            <div className="text-[11px] text-[#C4EACC] font-medium truncate">
              دینار — تەنها فرۆشتنی گەیشتوو
            </div>
          </div>
        </div>

        {/* ROW 4:
            Right: داهاتی چاوەڕوانی (White Card #FFFFFF)
            Left: ئۆردەری چاوەڕوان (Peach Card #FEECE2)
        */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Card 7 (Row 4 Right): داهاتی چاوەڕوانی */}
          <div
            onClick={() => onNavigate('sale_details')}
            className="bg-white border border-[#EDE6DC] p-4 sm:p-5 rounded-[28px] shadow-xs cursor-pointer hover:bg-[#FAF8F5] transition active:scale-[0.98] flex flex-col justify-between min-h-[140px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-[13px] font-bold text-[#3B3835]">
                داهاتی چاوەڕوانی
              </span>
              <div className="text-[#6E6A64]">
                <Coins className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>

            <div className="my-1.5 text-center sm:text-right">
              <span className="text-2xl sm:text-[28px] font-black text-[#1F1D1A] font-mono tracking-tight">
                {toKurdishDigits(pendingIncome)}
              </span>
            </div>

            <div className="text-[11px] text-[#8A857D] font-medium truncate">
              دینار — هێشتا نەگەشتووە
            </div>
          </div>

          {/* Card 8 (Row 4 Left): ئۆردەری چاوەڕوان */}
          <div
            onClick={() => onNavigate('sale_details')}
            className="bg-[#FEECE2] border border-[#FADCD0] p-4 sm:p-5 rounded-[28px] shadow-2xs cursor-pointer hover:opacity-95 transition active:scale-[0.98] flex flex-col justify-between min-h-[140px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-[13px] font-bold text-[#423834]">
                ئۆردەری چاوەڕوان
              </span>
              <div className="text-[#685B54]">
                <Clock className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>

            <div className="my-1.5 text-center sm:text-right">
              <span className="text-2xl sm:text-[28px] font-black text-[#2B2320] font-mono tracking-tight">
                {toKurdishDigits(pendingOrdersChicks)}
              </span>
            </div>

            <div className="text-[11px] text-[#8C7C74] font-medium truncate">
              جووت — لە ڕێگادایە
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* بەشی زیانی مردن (مرداربوون) - DIRECTLY ON DASHBOARD */}
        {/* ------------------------------------------------------------- */}
        <div className="pt-1">
          <div
            onClick={() => onNavigate('mortality')}
            className="bg-gradient-to-l from-[#FFF3EB] to-[#FDE8DF] border-2 border-[#F6CBB0] p-4 sm:p-5 rounded-[28px] shadow-xs cursor-pointer hover:border-[#E89E73] transition active:scale-[0.99] relative overflow-hidden"
          >
            {/* Background watermark badge */}
            <div className="absolute -left-3 -bottom-3 opacity-10 pointer-events-none text-rose-900">
              <HeartCrack className="w-24 h-24" />
            </div>

            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <h3 className="text-sm sm:text-base font-black text-[#7A2A18]">
                    زیانی مردن (مرداربوون)
                  </h3>
                  <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full border border-rose-200">
                    لەدەستچوون
                  </span>
                </div>
                <p className="text-[11px] text-[#8C4E3D] font-medium mt-1">
                  کۆی زیانی دارایی و ژمارەی مریشک و جووجکەی مرداربوو
                </p>
              </div>

              <div className="w-9 h-9 rounded-xl bg-[#FCD8C7] flex items-center justify-center text-[#7A2A18] shrink-0 shadow-2xs">
                <HeartCrack className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-3.5 pt-3 border-t border-[#F5C7B2] flex items-center justify-between">
              {/* Financial loss */}
              <div>
                <span className="text-[10px] text-[#8C4E3D] font-bold block">
                  کۆی زیانی خەمڵێنراو:
                </span>
                <span className="text-xl sm:text-2xl font-black text-[#7A2A18] font-mono tracking-tight" dir="ltr">
                  -{toKurdishDigits(totalMortalityLoss)} دینار
                </span>
              </div>

              {/* Dead chicks count */}
              <div className="text-left">
                <span className="text-[10px] text-[#8C4E3D] font-bold block">
                  ژمارەی مرداربوو:
                </span>
                <span className="text-lg sm:text-xl font-black text-[#7A2A18] font-mono tracking-tight">
                  {toKurdishDigits(totalDeadChicks)} جووجکە
                </span>
              </div>

              {/* Navigation prompt icon */}
              <div className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-[#7A2A18] hover:bg-white transition shrink-0">
                <ChevronLeft className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
