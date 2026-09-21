import React, { useState } from 'react';
import { Menu, Calculator, RefreshCw } from 'lucide-react';
import { toKurdishDigits } from '../utils/formatters';

interface CalculatorScreenProps {
  onOpenDrawer: () => void;
}

export const CalculatorScreen: React.FC<CalculatorScreenProps> = ({ onOpenDrawer }) => {
  const [calcMode, setCalcMode] = useState<'poultry' | 'simple'>('poultry');

  // Poultry calculator inputs
  const [chicks, setChicks] = useState<number | ''>(500);
  const [buyPrice, setBuyPrice] = useState<number | ''>(1390);
  const [sellPrice, setSellPrice] = useState<number | ''>(2100);
  const [feedPerChickKg, setFeedPerChickKg] = useState<number | ''>(3.5);
  const [feedPricePerKg, setFeedPricePerKg] = useState<number | ''>(750);
  const [otherExpensesTotal, setOtherExpensesTotal] = useState<number | ''>(150000);

  // Standard calculator input
  const [calcDisplay, setCalcDisplay] = useState('0');

  // Computed poultry calculations
  const count = Number(chicks) || 0;
  const totalChickCost = count * (Number(buyPrice) || 0);
  const totalFeedCost = count * (Number(feedPerChickKg) || 0) * (Number(feedPricePerKg) || 0);
  const totalOther = Number(otherExpensesTotal) || 0;
  const grandTotalCost = totalChickCost + totalFeedCost + totalOther;

  const totalExpectedRevenue = count * (Number(sellPrice) || 0);
  const expectedProfit = totalExpectedRevenue - grandTotalCost;
  const costPerChick = count > 0 ? Math.round(grandTotalCost / count) : 0;

  const handleSimpleBtn = (val: string) => {
    if (val === 'C') {
      setCalcDisplay('0');
      return;
    }
    if (val === '=') {
      try {
        // Safe arithmetic eval
        const sanitized = calcDisplay.replace(/×/g, '*').replace(/÷/g, '/');
        const res = Function(`'use strict'; return (${sanitized})`)();
        setCalcDisplay(String(res));
      } catch {
        setCalcDisplay('هەڵە');
      }
      return;
    }
    if (calcDisplay === '0' || calcDisplay === 'هەڵە') {
      setCalcDisplay(val);
    } else {
      setCalcDisplay(calcDisplay + val);
    }
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
          ژمێره ر
        </h1>
      </div>

      {/* Subtitle */}
      <div className="px-5 pt-1 pb-3">
        <h2 className="text-lg font-black text-slate-900">ژمێره ری کێڵگە</h2>
        <p className="text-xs text-slate-500 font-medium">
          خەمڵاندنی تێچوو و قازانجی پەلەوەر
        </p>
      </div>

      {/* Mode Selector */}
      <div className="px-5 mb-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => setCalcMode('poultry')}
          className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
            calcMode === 'poultry'
              ? 'bg-[#2D5A3F] text-white border-[#2D5A3F] shadow-xs'
              : 'bg-white text-slate-700 border-[#E8E2D6]'
          }`}
        >
          خەمڵاندنی بار و قازانج
        </button>
        <button
          onClick={() => setCalcMode('simple')}
          className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
            calcMode === 'simple'
              ? 'bg-[#2D5A3F] text-white border-[#2D5A3F] shadow-xs'
              : 'bg-white text-slate-700 border-[#E8E2D6]'
          }`}
        >
          ژمێریاری ژمارەیی خێرا
        </button>
      </div>

      {calcMode === 'poultry' ? (
        <div className="px-5 space-y-4">
          {/* Result Card */}
          <div className="bg-[#DCECD8] border border-[#B9DDB2] p-4 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#205128]">قازانجی خەمڵێنراوی سافی:</span>
              <span className="text-lg font-black text-[#194B22] font-mono">
                {toKurdishDigits(expectedProfit)} د.ع
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#BEDFB6] text-xs">
              <div>
                <span className="text-slate-600 block">کۆی تێچووی گشتی:</span>
                <span className="font-bold text-slate-900 font-mono">
                  {toKurdishDigits(grandTotalCost)} د.ع
                </span>
              </div>
              <div>
                <span className="text-slate-600 block">تێچووی ١ جووجکە:</span>
                <span className="font-bold text-slate-900 font-mono">
                  {toKurdishDigits(costPerChick)} د.ع
                </span>
              </div>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="bg-white border border-[#E8E2D6] p-4 rounded-2xl shadow-xs space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ژمارەی جووجکە
              </label>
              <input
                type="number"
                value={chicks}
                onChange={(e) => setChicks(e.target.value ? Number(e.target.value) : '')}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  نرخی کڕینی جووت (د.ع)
                </label>
                <input
                  type="number"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value ? Number(e.target.value) : '')}
                  className="w-full text-xs font-semibold px-3 py-2 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  نرخی فرۆشتنی پێشبینیکراو
                </label>
                <input
                  type="number"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value ? Number(e.target.value) : '')}
                  className="w-full text-xs font-semibold px-3 py-2 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  کیلۆی ئالیک بۆ هەر جووجکەیەک
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={feedPerChickKg}
                  onChange={(e) => setFeedPerChickKg(e.target.value ? Number(e.target.value) : '')}
                  className="w-full text-xs font-semibold px-3 py-2 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  نرخی هەر کیلۆ ئالیک (د.ع)
                </label>
                <input
                  type="number"
                  value={feedPricePerKg}
                  onChange={(e) => setFeedPricePerKg(e.target.value ? Number(e.target.value) : '')}
                  className="w-full text-xs font-semibold px-3 py-2 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                خەرجییەکانی تر (دەرمان، گاز، کرێکار...)
              </label>
              <input
                type="number"
                value={otherExpensesTotal}
                onChange={(e) => setOtherExpensesTotal(e.target.value ? Number(e.target.value) : '')}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Simple Calculator Keyboard */
        <div className="px-5">
          <div className="bg-white border border-[#E8E2D6] p-4 rounded-2xl shadow-xs">
            {/* Display */}
            <div className="bg-[#FAF7F2] border border-[#E8E2D6] rounded-xl p-4 text-left font-mono text-2xl font-black text-slate-900 mb-4 overflow-x-auto">
              {calcDisplay}
            </div>

            {/* Keys */}
            <div className="grid grid-cols-4 gap-2 text-base font-bold font-mono" dir="ltr">
              {['C', '(', ')', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '%', '='].map(
                (btn) => (
                  <button
                    key={btn}
                    onClick={() => handleSimpleBtn(btn)}
                    className={`py-3.5 rounded-xl border transition cursor-pointer active:scale-95 ${
                      btn === '='
                        ? 'bg-[#2D5A3F] text-white border-[#2D5A3F]'
                        : btn === 'C'
                        ? 'bg-rose-100 text-rose-800 border-rose-200'
                        : ['÷', '×', '-', '+'].includes(btn)
                        ? 'bg-[#FFE5CF] text-[#8C3E14] border-[#F6CBB0]'
                        : 'bg-[#FAF8F5] text-slate-800 border-[#E8E2D6] hover:bg-[#F2EDE2]'
                    }`}
                  >
                    {btn}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
