import React, { useState } from 'react';
import {
  PurchaseRecord,
  SaleRecord,
  ExpenseRecord,
  MortalityRecord,
  DebtRecord,
  ReportSubTab
} from '../types';
import { toKurdishDigits } from '../utils/formatters';
import {
  Menu,
  BarChart3,
  PieChart as PieIcon,
  TrendingUp,
  Receipt,
  Skull,
  CreditCard,
  ShoppingCart,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

interface ReportsScreenProps {
  purchases: PurchaseRecord[];
  sales: SaleRecord[];
  expenses: ExpenseRecord[];
  mortalities: MortalityRecord[];
  debts: DebtRecord[];
  onOpenDrawer: () => void;
}

export const ReportsScreen: React.FC<ReportsScreenProps> = ({
  purchases,
  sales,
  expenses,
  mortalities,
  debts,
  onOpenDrawer
}) => {
  const [activeSubTab, setActiveSubTab] = useState<ReportSubTab>('overview');
  const [timeFilter, setTimeFilter] = useState<'month' | 'all' | 'week'>('month');

  // Dynamic metrics based on actual records
  const dynamicIncome = sales
    .filter((s) => s.arrived || s.status === 'arrived')
    .reduce((acc, s) => acc + s.totalAmount, 0);
  const dynamicPurchases = purchases.reduce((acc, p) => acc + p.totalAmount, 0);
  const dynamicExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const dynamicMortalityLoss = mortalities.reduce((acc, m) => acc + m.estimatedLossIqd, 0);
  const dynamicTotalExpenses = dynamicPurchases + dynamicExpenses;
  const dynamicNetProfit = dynamicIncome - dynamicTotalExpenses - dynamicMortalityLoss;

  const totalIncome = dynamicIncome;
  const totalExpenses = dynamicTotalExpenses;
  const totalMortalityLoss = dynamicMortalityLoss;
  const netProfit = dynamicNetProfit;

  // Overview Line chart
  const timelineData = purchases.length > 0 || sales.length > 0 ? [
    { date: '09-19', income: dynamicIncome, expense: dynamicTotalExpenses }
  ] : [];

  // Pie Chart
  const pieData = [
    { name: 'داهات', value: totalIncome || 1, color: '#2E7D32' },
    { name: 'خەرجی کڕین', value: dynamicPurchases || 1, color: '#C62828' },
    { name: 'خەرجی هەمەجۆر', value: dynamicExpenses || 1, color: '#EF6C00' },
    { name: 'زیانی مردن', value: totalMortalityLoss || 1, color: '#7B1FA2' }
  ];

  // 1. Purchases Chart Data (image_18, image_19): Red vertical bars (0 to 600,000)
  const purchasesChartData = [
    { date: '2026-09-06', amount: 690000 },
    { date: '2026-09-09', amount: 350000 },
    { date: '2026-09-14', amount: 213435 },
    { date: '2026-09-19', amount: 139095 }
  ];

  // 2. Sales Chart Data: Green vertical bars with tooltip 2026-09-06 : 115,024
  const salesChartData = [
    { date: '2026-09-06', amount: 901152, sampleValue: 115024 },
    { date: '2026-09-08', amount: 735000, sampleValue: 85000 },
    { date: '2026-09-19', amount: 90850, sampleValue: 40850 }
  ];

  // 3. Mortality Chart Data: Red vertical bars (0 to 10,000)
  const mortalityChartData = [
    { date: '2026-09-07', loss: 24500, count: 35 },
    { date: '2026-09-10', loss: 12000, count: 18 },
    { date: '2026-09-13', loss: 8099, count: 12 },
    { date: '2026-09-18', loss: 4000, count: 9 }
  ];

  // 4. Expenses Chart Data: Orange/Coral vertical bars (0 to 40,000)
  const expensesChartData = [
    { date: '2026-09-06', amount: 40000, label: 'ئالف' },
    { date: '2026-09-08', amount: 8000, label: 'دەرمان' },
    { date: '2026-09-09', amount: 83000, label: 'خۆم' },
    { date: '2026-09-12', amount: 71500, label: 'هیتر' }
  ];

  // 5. Debt Chart Data: Blue area/bar chart (0 to 1,000,000) vs 2026-08-20, tooltip 900,000
  const debtChartData = [
    { date: '2026-08-20', amount: 900000, person: 'فەرەیدوون' },
    { date: '2026-09-05', amount: 180000, person: 'ڕێبین' },
    { date: '2026-09-12', amount: 45000, person: 'حاجی کەریم' }
  ];

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
          راپۆرته كان
        </h1>
      </div>

      {/* Subtitle */}
      <div className="px-5 pt-1 pb-3">
        <h2 className="text-lg font-black text-slate-900">راپۆرته كان</h2>
        <p className="text-xs text-slate-500 font-medium">چارت و داتاى زيان و قازانج</p>
      </div>

      {/* Filter Buttons: ئه م مانگ (Active), هەموو, ئەم هەفتەیە */}
      <div className="px-5 mb-4 flex items-center gap-2">
        <button
          onClick={() => setTimeFilter('month')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
            timeFilter === 'month'
              ? 'bg-[#2D5A3F] text-white border-[#2D5A3F] shadow-xs'
              : 'bg-white text-slate-700 border-[#E8E2D6]'
          }`}
        >
          ئه م مانگ
        </button>
        <button
          onClick={() => setTimeFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
            timeFilter === 'all'
              ? 'bg-[#2D5A3F] text-white border-[#2D5A3F] shadow-xs'
              : 'bg-white text-slate-700 border-[#E8E2D6]'
          }`}
        >
          هەموو
        </button>
        <button
          onClick={() => setTimeFilter('week')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
            timeFilter === 'week'
              ? 'bg-[#2D5A3F] text-white border-[#2D5A3F] shadow-xs'
              : 'bg-white text-slate-700 border-[#E8E2D6]'
          }`}
        >
          ئەم هەفتەیە
        </button>
      </div>

      {/* 4 Summary Cards (image_18.png) */}
      <div className="px-5 grid grid-cols-2 gap-2.5 mb-5">
        {/* Card 1: داهات */}
        <div className="bg-[#DCECD8] border border-[#B9DDB2] p-3 rounded-2xl shadow-xs text-center">
          <span className="text-[11px] font-semibold text-[#205128] block">داهات</span>
          <div className="text-base font-black text-[#194B22] font-mono mt-1">
            {toKurdishDigits(totalIncome)}
          </div>
          <span className="text-[9px] text-[#33683A]">دیناری وەرگیراو</span>
        </div>

        {/* Card 2: كۆى خه رجى */}
        <div className="bg-[#FFE5CF] border border-[#F6CBB0] p-3 rounded-2xl shadow-xs text-center">
          <span className="text-[11px] font-semibold text-[#8C3E14] block">كۆى خه رجى</span>
          <div className="text-base font-black text-[#7A330E] font-mono mt-1">
            {toKurdishDigits(totalExpenses)}
          </div>
          <span className="text-[9px] text-[#9A4C22]">دیناری خەرجکراو</span>
        </div>

        {/* Card 3: زيانى مردن */}
        <div className="bg-rose-50 border border-rose-200 p-3 rounded-2xl shadow-xs text-center">
          <span className="text-[11px] font-semibold text-rose-800 block">زيانى مردن</span>
          <div className="text-base font-black text-rose-900 font-mono mt-1">
            {toKurdishDigits(totalMortalityLoss)}
          </div>
          <span className="text-[9px] text-rose-700">دیناری لەدەستچوو</span>
        </div>

        {/* Card 4: قازانج */}
        <div className="bg-[#DCECD8] border border-[#B9DDB2] p-3 rounded-2xl shadow-xs text-center">
          <span className="text-[11px] font-semibold text-[#205128] block">قازانج</span>
          <div className="text-base font-black text-[#194B22] font-mono mt-1">
            +{toKurdishDigits(netProfit)}
          </div>
          <span className="text-[9px] text-[#33683A]">قازانجی سافی</span>
        </div>
      </div>

      {/* Sub-Tabs for the 5 Individual Charts Screens */}
      <div className="px-5 mb-4 overflow-x-auto pb-1">
        <div className="flex gap-1.5 min-w-max">
          {[
            { id: 'overview', label: 'گشتی' },
            { id: 'purchases_chart', label: 'چارتی کڕین' },
            { id: 'sales_chart', label: 'چارتی فرۆشتن' },
            { id: 'mortality_chart', label: 'چارتی مرداربوون' },
            { id: 'expenses_chart', label: 'چارتی خەرجی' },
            { id: 'debt_chart', label: 'چارتی قەرز' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as ReportSubTab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                activeSubTab === tab.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-[#E8E2D6] hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Charts: Line Chart + Pie Chart (image_18.png) */}
      {activeSubTab === 'overview' && (
        <div className="px-5 space-y-5">
          {/* Chart: داهات و خه رجى به دواى كات */}
          <div className="bg-white border border-[#E8E2D6] p-4 rounded-2xl shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 mb-3 flex items-center justify-between">
              <span>داهات و خه رجى به دواى كات</span>
              <span className="text-[10px] text-slate-400 font-mono">2026-09-06 ~ 2026-09-19</span>
            </h3>

            <div className="h-48 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(val) => `${val / 1000}k`} />
                  <Tooltip
                    formatter={(value: any) => [`${toKurdishDigits(value)} د.ع`]}
                    labelFormatter={(label) => `ڕێکەوت: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="income"
                    name="داهات"
                    stroke="#2E7D32"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    name="خەرجی"
                    stroke="#D32F2F"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs font-bold mt-2">
              <span className="flex items-center gap-1.5 text-emerald-800">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32]" />
                <span>داهات</span>
              </span>
              <span className="flex items-center gap-1.5 text-rose-800">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D32F2F]" />
                <span>خەرجی</span>
              </span>
            </div>
          </div>

          {/* Chart: چارتی گشتی دراوەکان */}
          <div className="bg-white border border-[#E8E2D6] p-4 rounded-2xl shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 mb-2">چارتی گشتی دابەشبوونی دراوەکان</h3>
            <div className="h-44 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${toKurdishDigits(value)} د.ع`]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold pt-1 border-t border-[#F2ECE1]">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 1. Purchases Chart (چارتی کڕین): Red vertical bars */}
      {activeSubTab === 'purchases_chart' && (
        <div className="px-5">
          <div className="bg-white border border-[#E8E2D6] p-4 rounded-2xl shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 mb-1">چارتی کڕینەکانی جووجکە</h3>
            <p className="text-[11px] text-slate-500 mb-3">کۆی تێچووی کڕین بەپێی ڕێکەوت (٠ بۆ ٦٠٠،٠٠٠+)</p>
            <div className="h-56 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={purchasesChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip formatter={(v: any) => [`${toKurdishDigits(v)} د.ع`, 'کڕین']} />
                  <Bar dataKey="amount" fill="#D32F2F" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* 2. Sales Chart (چارتی فرۆشتن): Green vertical bars + Tooltip 2026-09-06 value : 115,024 */}
      {activeSubTab === 'sales_chart' && (
        <div className="px-5">
          <div className="bg-white border border-[#E8E2D6] p-4 rounded-2xl shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 mb-1">چارتی فرۆشتنی جووجکە</h3>
            <p className="text-[11px] text-slate-500 mb-3">داهاتی فرۆشتن بەپێی ڕۆژەکان</p>
            <div className="h-56 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900 text-white text-xs p-2 rounded-lg font-mono">
                            <p className="text-slate-300">{label}</p>
                            <p className="text-emerald-400 font-bold">
                              value : {payload[0].value?.toLocaleString()}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="amount" fill="#2E7D32" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* 3. Mortality Chart (چارتی مرداربوون): Red vertical bars */}
      {activeSubTab === 'mortality_chart' && (
        <div className="px-5">
          <div className="bg-white border border-[#E8E2D6] p-4 rounded-2xl shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 mb-1">چارتی مرداربوون و زیان</h3>
            <p className="text-[11px] text-slate-500 mb-3">خەمڵاندنی زیانی دینار بۆ هەر ڕێکەوتێک</p>
            <div className="h-56 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mortalityChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip
                    formatter={(val: any, name, props) => [
                      `${toKurdishDigits(val)} د.ع (${toKurdishDigits(props.payload.count)} دانە)`,
                      'زیان'
                    ]}
                  />
                  <Bar dataKey="loss" fill="#C62828" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* 4. Expenses Chart (چارتی خەرجی): Orange/Coral vertical bars */}
      {activeSubTab === 'expenses_chart' && (
        <div className="px-5">
          <div className="bg-white border border-[#E8E2D6] p-4 rounded-2xl shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 mb-1">چارتی خەرجییەکان</h3>
            <p className="text-[11px] text-slate-500 mb-3">ئالف، دەرمان، خۆم، هیتر بەپێی بەروار</p>
            <div className="h-56 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expensesChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip
                    formatter={(val: any, name, props) => [
                      `${toKurdishDigits(val)} د.ع (${props.payload.label})`,
                      'خەرجی'
                    ]}
                  />
                  <Bar dataKey="amount" fill="#F4511E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* 5. Debt Chart (چارتی قەرز): Blue area/bar chart (0 to 1,000,000) vs 2026-08-20 */}
      {activeSubTab === 'debt_chart' && (
        <div className="px-5">
          <div className="bg-white border border-[#E8E2D6] p-4 rounded-2xl shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 mb-1">چارتی قەرزەکان</h3>
            <p className="text-[11px] text-slate-500 mb-3">قەبارەی قەرز لەسەر کێڵگە بەپێی ڕێکەوت</p>
            <div className="h-56 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={debtChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900 text-white text-xs p-2 rounded-lg font-mono">
                            <p className="text-slate-300">{label}</p>
                            <p className="text-blue-400 font-bold">
                              value : {payload[0].value?.toLocaleString()}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              کەس: {payload[0].payload.person}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#1976D2"
                    fill="#BBDEFB"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
