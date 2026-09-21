import {
  PurchaseRecord,
  SaleRecord,
  PreOrderRecord,
  WalletTransaction,
  MortalityRecord,
  ExpenseRecord,
  DebtRecord,
  DriverRecord
} from '../types';

export const initialPurchases: PurchaseRecord[] = [
  {
    id: 'pur-1',
    chicksCount: 500,
    pricePerChick: 1380,
    location: 'هەولێر - کێڵگەی ڕێگا',
    date: '2026-09-06',
    notes: 'باری یەکەمی جووجکە، تەندروستی زۆر باش',
    totalAmount: 690000
  },
  {
    id: 'pur-2',
    chicksCount: 250,
    pricePerChick: 1400,
    location: 'سلێمانی - کێڵگەی قوشتەپە',
    date: '2026-09-09',
    notes: 'باری دووەم',
    totalAmount: 350000
  },
  {
    id: 'pur-3',
    chicksCount: 153,
    pricePerChick: 1395,
    location: 'کەرکووک',
    date: '2026-09-14',
    notes: 'پڕکردنەوەی هۆڵ',
    totalAmount: 213435
  },
  {
    id: 'pur-4',
    chicksCount: 100,
    pricePerChick: 1391,
    location: 'چەمچەماڵ',
    date: '2026-09-19',
    notes: 'باری کۆتایی',
    totalAmount: 139095
  }
];

export const initialSales: SaleRecord[] = [
  {
    id: 'sale-1',
    chicksCount: 25,
    pricePerChick: 2000,
    city: 'دەربەندیخان',
    customerName: 'کاک هێمن',
    phone: '0547 032 0773',
    notes: 'تۆڕەرەی بەپەلە',
    date: '2026-09-19',
    driver: 'بێ سایەق ←',
    arrived: false,
    status: 'order_pending',
    totalAmount: 50000
  },
  {
    id: 'sale-2',
    chicksCount: 19,
    pricePerChick: 2150,
    city: 'گەورە',
    customerName: 'مارکێتی بەختیاری',
    phone: '0750 123 4567',
    notes: 'بە تەواوی گەیشت',
    date: '2026-09-19',
    driver: 'سەردار بارهەڵگر',
    arrived: true,
    status: 'arrived',
    totalAmount: 40850
  },
  {
    id: 'sale-3',
    chicksCount: 350,
    pricePerChick: 2100,
    city: 'سلێمانی',
    customerName: 'کۆمپانیای شاهان',
    phone: '0770 987 6543',
    notes: 'بە کاش واسڵکرا',
    date: '2026-09-08',
    driver: 'ئارام مازدا',
    arrived: true,
    status: 'arrived',
    totalAmount: 735000
  },
  {
    id: 'sale-4',
    chicksCount: 424,
    pricePerChick: 2125,
    city: 'هەولێر',
    customerName: 'قەسابی شار',
    phone: '0750 444 3322',
    notes: 'باری گەورەی هەولێر',
    date: '2026-09-06',
    driver: 'بەهزاد کیا',
    arrived: true,
    status: 'arrived',
    totalAmount: 901152
  }
];

export const initialPreOrders: PreOrderRecord[] = [
  {
    id: 'pre-1',
    personName: 'کاک ئاراس غەریب',
    city: 'هەولێر',
    phone: '0750 876 5432',
    chicksCount: 40,
    date: '2026-09-19',
    notes: 'بۆ هەفتەی داهاتوو مریشکی تەندروست',
    status: 'waiting'
  },
  {
    id: 'pre-2',
    personName: 'مام خەسرەو',
    city: 'دهۆک',
    phone: '0750 321 0987',
    chicksCount: 60,
    date: '2026-09-18',
    notes: 'پێشەکی واسڵکردووە',
    status: 'completed'
  },
  {
    id: 'pre-3',
    personName: 'مامۆستا نەوزاد',
    city: 'ڕانیە',
    phone: '0750 654 9870',
    chicksCount: 25,
    date: '2026-09-17',
    notes: 'تۆڕەرەی هەینی',
    status: 'waiting'
  }
];

export const initialWalletTransactions: WalletTransaction[] = [
  {
    id: 'w-1',
    type: 'add',
    currency: 'IQD',
    amount: 500000,
    date: '2026-09-01',
    notes: 'سەرمایەی سەرەتایی مانگ'
  },
  {
    id: 'w-2',
    type: 'add',
    currency: 'IQD',
    amount: 340000,
    date: '2026-09-10',
    notes: 'داهاتی فرۆشتنی نەقد'
  },
  {
    id: 'w-3',
    type: 'withdraw',
    currency: 'IQD',
    amount: 167500,
    date: '2026-09-15',
    notes: 'تێچووی پێداویستی کەسی'
  }
];

export const initialMortalities: MortalityRecord[] = [
  {
    id: 'mor-1',
    chicksCount: 35,
    season: 'بەهار',
    date: '2026-09-07',
    notes: 'بەهۆی گەرما لە کاتی گواستنەوە',
    estimatedLossIqd: 24500
  },
  {
    id: 'mor-2',
    chicksCount: 18,
    season: 'بەهار',
    date: '2026-09-10',
    notes: 'تێکچوونی تەندروستی لە هۆڵ',
    estimatedLossIqd: 12000
  },
  {
    id: 'mor-3',
    chicksCount: 12,
    season: 'بەهار',
    date: '2026-09-13',
    notes: 'خنکانی جووجکە لە گۆشە',
    estimatedLossIqd: 8099
  },
  {
    id: 'mor-4',
    chicksCount: 9,
    season: 'بەهار',
    date: '2026-09-18',
    notes: 'لەدەستچوونی سروشتی',
    estimatedLossIqd: 4000
  }
];

export const initialExpenses: ExpenseRecord[] = [
  {
    id: 'exp-1',
    type: 'ئالف',
    amount: 40000,
    date: '2026-09-06',
    notes: 'کڕینی ئالیکی سەرەتایی پلەی ١'
  },
  {
    id: 'exp-2',
    type: 'دەرمان',
    amount: 8000,
    date: '2026-09-08',
    notes: 'ڤیتامین و ڤاکسینی گەشەکردن'
  },
  {
    id: 'exp-3',
    type: 'خۆم',
    amount: 83000,
    date: '2026-09-09',
    notes: 'خەرجی تایبەت و هاتوچۆ'
  },
  {
    id: 'exp-4',
    type: 'نێرگەلە',
    amount: 15000,
    date: '2026-09-10',
    notes: 'نێرگەلە و تەباق بۆ کێڵگە'
  },
  {
    id: 'exp-5',
    type: 'بەنزین',
    amount: 25000,
    date: '2026-09-11',
    notes: 'بەنزینی مۆلیدە و سەیارەی کێڵگە'
  },
  {
    id: 'exp-6',
    type: 'هیتر',
    amount: 31500,
    date: '2026-09-12',
    notes: 'پاککەرەوە و پێداویستی کێڵگە'
  }
];

export const initialDebts: DebtRecord[] = [
  {
    id: 'debt-1',
    type: 'borrowed', // قەرزم کردووە (لەسەرمە)
    personName: 'فەرەیدوون',
    amount: 350000,
    remainingAmount: 300000,
    date: '2026-08-20',
    notes: 'قەرزی ئالیک و سەبەتە',
    isSettled: false,
    repayments: [
      {
        id: 'rep-1',
        amount: 50000,
        date: '2026-09-01',
        notes: 'بەشێکی واسڵکرا'
      }
    ]
  },
  {
    id: 'debt-2',
    type: 'lent', // قەرزم داوە (داومە)
    personName: 'کاک ڕێبین سلێمانی',
    amount: 180000,
    remainingAmount: 180000,
    date: '2026-09-05',
    notes: 'باقی باری مریشک',
    isSettled: false,
    repayments: []
  },
  {
    id: 'debt-3',
    type: 'borrowed',
    personName: 'حاجی کەریم دەرمانخانە',
    amount: 45000,
    remainingAmount: 0,
    date: '2026-09-12',
    notes: 'دەرمانی ڤاکسین',
    isSettled: true,
    repayments: [
      {
        id: 'rep-2',
        amount: 45000,
        date: '2026-09-15',
        notes: 'تەواوی قەرزەکە واسڵکرا'
      }
    ]
  }
];

export const initialDrivers: DriverRecord[] = [
  {
    id: 'drv-1',
    name: 'سەردار بارهەڵگر',
    city: 'سلێمانی',
    phone1: '0770 145 8899',
    phone2: '0750 998 7766',
    notes: 'سایەقی دەستپاک و بەڕێز',
    totalTrips: 18,
    isBest: true
  },
  {
    id: 'drv-2',
    name: 'ئارام مازدا',
    city: 'هەولێر',
    phone1: '0750 432 1122',
    notes: 'خاوەن کیا بارهەڵگری قەفەس',
    totalTrips: 14,
    isBest: false
  },
  {
    id: 'drv-3',
    name: 'بەهزاد گۆران',
    city: 'کەرکووک',
    phone1: '0771 555 4433',
    notes: 'گواستنەوەی ڕێگای دوور',
    totalTrips: 9,
    isBest: false
  }
];

// Recent Activities for image_1.png
export interface ActivityItem {
  id: string;
  type: 'sale' | 'purchase' | 'expense' | 'mortality';
  title: string;
  description: string;
  amountText: string;
  date: string;
  statusDotColor: string;
}

export const initialActivities: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'sale',
    title: 'ناردنی بار - دەربەندیخان',
    description: '25 جووت بە نرخی 2,000 د.ع',
    amountText: '+ 50,000 د.ع',
    date: '2026-09-19',
    statusDotColor: 'bg-amber-400'
  },
  {
    id: 'act-2',
    type: 'sale',
    title: 'فرۆشتن - گەورە (گەیشتوو)',
    description: '19 جووت بە نرخی 2,150 د.ع',
    amountText: '+ 40,850 د.ع',
    date: '2026-09-19',
    statusDotColor: 'bg-emerald-500'
  },
  {
    id: 'act-3',
    type: 'purchase',
    title: 'کڕینی جووجکەی چەمچەماڵ',
    description: '100 جووت بە نرخی 1,391 د.ع',
    amountText: '- 139,095 د.ع',
    date: '2026-09-19',
    statusDotColor: 'bg-rose-500'
  },
  {
    id: 'act-4',
    type: 'expense',
    title: 'بەنزین و سووتەمەنی',
    description: 'خەرجی کۆگا و مۆلیدە',
    amountText: '- 71,500 د.ع',
    date: '2026-09-12',
    statusDotColor: 'bg-orange-500'
  }
];
