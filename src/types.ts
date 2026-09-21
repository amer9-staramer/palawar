export type NavTab =
  | 'dashboard'
  | 'purchases'
  | 'sales'
  | 'sale_details'
  | 'preorders'
  | 'wallet'
  | 'mortality'
  | 'expenses'
  | 'debts'
  | 'drivers'
  | 'reports'
  | 'calculator';

export type ReportSubTab =
  | 'overview'
  | 'purchases_chart'
  | 'sales_chart'
  | 'mortality_chart'
  | 'expenses_chart'
  | 'debt_chart';

export interface PurchaseRecord {
  id: string;
  chicksCount: number; // ژمارەی جووت
  pricePerChick: number; // نرخی جووت (دینار)
  location: string; // شوێنی کڕین
  date: string; // ڕێکەوت
  notes?: string; // تێبینی (ئیختیاری)
  totalAmount: number; // کۆی گشتی
}

export interface SaleRecord {
  id: string;
  chicksCount: number; // ژمارەی جووت
  pricePerChick: number; // نرخی جووت (دینار)
  city: string; // شار
  customerName: string; // ناوی کڕیار
  phone?: string; // ژمارە (ئیختیاری)
  notes?: string; // تێبینی
  date: string; // ڕێکەوت
  driver: string; // سایەق (گەیاندن)
  arrived: boolean; // گەیشت؟
  status: 'order_pending' | 'arrived' | 'cancelled';
  totalAmount: number;
}

export interface PreOrderRecord {
  id: string;
  personName: string; // ناوی کەس
  city: string; // شار
  phone: string; // ژمارەی مۆبایل
  chicksCount?: number; // ژمارەی جووت (ئیختیاری)
  date: string; // ڕێکەوت
  notes?: string; // تێبینی
  status: 'waiting' | 'completed';
}

export interface WalletTransaction {
  id: string;
  type: 'add' | 'withdraw';
  currency: 'IQD' | 'USD';
  amount: number;
  date: string;
  notes?: string;
}

export interface MortalityRecord {
  id: string;
  chicksCount: number; // ژمارەی جووجکە (دانە)
  season: string; // وەرز (بەهار، هاوین...)
  date: string; // ڕێکەوت
  notes?: string; // تێبینی
  estimatedLossIqd: number; // کۆی زیان بە دینار
}

export interface ExpenseRecord {
  id: string;
  type: 'ئالف' | 'دەرمان' | 'نێرگەلە' | 'بەنزین' | 'خۆم' | 'هیتر';
  amount: number; // بڕ (دینار)
  date: string; // ڕێکەوت
  notes?: string; // تێبینی
}

export interface DebtRepayment {
  id: string;
  amount: number; // بڕی دانەوە
  date: string; // ڕێکەوت
  notes?: string; // تێبینی
}

export interface DebtRecord {
  id: string;
  type: 'borrowed' | 'lent'; // قەرزم کردووە (لەسەرمە) | قەرزم داوە (داومە)
  personName: string; // ناوی کەس
  amount: number; // بڕی قەرز (دینار)
  remainingAmount?: number; // بڕی ماوەی قەرز دوای دانەوەکان
  date: string; // ڕێکەوت
  notes?: string; // تێبینی
  isSettled: boolean; // تەسوویە کراوە / تەسوویە نەکراوە
  repayments?: DebtRepayment[]; // تۆماری دانەوەکان
}

export interface DriverRecord {
  id: string;
  name: string; // ناوی سایەق
  city: string; // شار
  phone1: string; // مۆبایل ١
  phone2?: string; // مۆبایل ٢ (ئیختیاری)
  notes?: string; // تێبینی
  totalTrips?: number;
  isBest?: boolean;
}
