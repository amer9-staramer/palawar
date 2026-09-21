import React, { useState } from 'react';
import { DriverRecord } from '../types';
import { toKurdishDigits } from '../utils/formatters';
import { Menu, Truck, Plus, Phone, Trash2, Award, Check } from 'lucide-react';

interface DriversScreenProps {
  drivers: DriverRecord[];
  onAddDriver: (d: Omit<DriverRecord, 'id'>) => void;
  onDeleteDriver: (id: string) => void;
  onOpenDrawer: () => void;
}

export const DriversScreen: React.FC<DriversScreenProps> = ({
  drivers,
  onAddDriver,
  onDeleteDriver,
  onOpenDrawer
}) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [notes, setNotes] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const bestDriver = drivers.find((d) => d.isBest) || drivers[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone1.trim()) {
      alert('تکایە ناوی سایەق و ژمارەی مۆبایل بنووسە');
      return;
    }

    onAddDriver({
      name: name.trim(),
      city: city.trim() || 'سلێمانی',
      phone1: phone1.trim(),
      phone2: phone2.trim(),
      notes: notes.trim(),
      totalTrips: 1,
      isBest: false
    });

    setName('');
    setCity('');
    setPhone1('');
    setPhone2('');
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
          سايه قه كان
        </h1>
      </div>

      {/* Subtitle */}
      <div className="px-5 pt-1 pb-4">
        <h2 className="text-lg font-black text-slate-900">سايه قه كان</h2>
        <p className="text-xs text-slate-500 font-medium">
          پيرستى هه موو سايه قه كان له گه ڵ ژماره و شار
        </p>
      </div>

      {/* Summary Cards (image_17.png) */}
      <div className="px-5 grid grid-cols-2 gap-3 mb-6">
        {/* Card 1: كۆى سايه قه كان */}
        <div className="bg-white border border-[#E8E2D6] p-3.5 rounded-2xl shadow-xs text-center">
          <span className="text-xs font-semibold text-slate-600 block">كۆى سايه قه كان</span>
          <div className="text-xl font-black text-slate-900 font-mono mt-1">
            {toKurdishDigits(drivers.length)}
          </div>
          <span className="text-[10px] text-slate-400">سایەقی بەردەست</span>
        </div>

        {/* Card 2: باشترين سايه ق */}
        <div className="bg-[#DCECD8] border border-[#B9DDB2] p-3.5 rounded-2xl shadow-xs text-center">
          <span className="text-xs font-semibold text-[#205128] block">باشترين سايه ق</span>
          <div className="text-sm font-black text-[#194B22] mt-1 truncate px-1">
            {bestDriver ? bestDriver.name : 'سەردار بارهەڵگر'}
          </div>
          <span className="text-[10px] text-[#33683A]">
            {bestDriver?.totalTrips ? `${toKurdishDigits(bestDriver.totalTrips)} گەشت` : 'چالاکترین'}
          </span>
        </div>
      </div>

      {/* Form 'سايه قى نوێ' (image_17.png) */}
      <div className="px-5 mb-6">
        <div className="bg-white border border-[#E8E2D6] p-5 rounded-2xl shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-700" />
            <span>سايه قى نوێ</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Field: ناوى سايه ق */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ناوى سايه ق *
              </label>
              <input
                type="text"
                required
                placeholder="ناوی تەواوی شۆفێر"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field: شار */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                شار
              </label>
              <input
                type="text"
                placeholder="سلێمانی، هەولێر، دەربەندیخان..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field: مؤبايل ١ */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                مؤبايل ١ *
              </label>
              <input
                type="text"
                required
                placeholder="0750 000 0000"
                value={phone1}
                onChange={(e) => setPhone1(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field: مؤبايل ٢ (ئيبتيارى) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                مؤبايل ٢ (ئيبتيارى)
              </label>
              <input
                type="text"
                placeholder="0770 000 0000"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
                className="w-full text-xs font-semibold px-3.5 py-2.5 bg-[#FFF0E2] border border-[#F5CFB5] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#E89E73]"
              />
            </div>

            {/* Field: تێبينى */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                تێبينى
              </label>
              <input
                type="text"
                placeholder="جۆری ئۆتۆمبێل، توانای بارکردن..."
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
              <span>سایەقەکە بە سەرکەوتوویی تۆمارکرا</span>
            </div>
          )}
        </div>
      </div>

      {/* Drivers List */}
      <div className="px-5">
        <h3 className="text-xs font-bold text-slate-700 mb-2">لیستی سایەقەکان</h3>
        <div className="space-y-2.5">
          {drivers.map((drv) => (
            <div
              key={drv.id}
              className="bg-white border border-[#E8E2D6] p-3.5 rounded-2xl shadow-xs flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-xs text-slate-900 font-bold">{drv.name}</strong>
                  <span className="text-[10px] text-slate-500 bg-[#EFE9DD] px-1.5 py-0.5 rounded-md">
                    {drv.city}
                  </span>
                  {drv.isBest && (
                    <span className="text-[10px] bg-[#DCECD8] text-[#194B22] px-1.5 py-0.5 rounded-md font-bold flex items-center gap-1">
                      <Award className="w-3 h-3 text-[#194B22]" />
                      <span>باشترین</span>
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-600 mt-1 flex items-center gap-3">
                  <a href={`tel:${drv.phone1}`} className="flex items-center gap-1 text-emerald-800 hover:underline">
                    <Phone className="w-3 h-3" />
                    <span>{drv.phone1}</span>
                  </a>
                  {drv.phone2 && (
                    <a href={`tel:${drv.phone2}`} className="text-slate-500 hover:underline">
                      {drv.phone2}
                    </a>
                  )}
                </div>
                {drv.notes && <p className="text-[10px] text-slate-400 mt-0.5">{drv.notes}</p>}
              </div>

              <button
                onClick={() => onDeleteDriver(drv.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
