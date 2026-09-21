import React, { useState, useEffect } from 'react';
import {
  NavTab,
  PurchaseRecord,
  SaleRecord,
  PreOrderRecord,
  WalletTransaction,
  MortalityRecord,
  ExpenseRecord,
  DebtRecord,
  DriverRecord
} from './types';
import {
  initialPurchases,
  initialSales,
  initialPreOrders,
  initialWalletTransactions,
  initialMortalities,
  initialExpenses,
  initialDebts,
  initialDrivers
} from './data/initialData';
import { NavigationDrawer } from './components/NavigationDrawer';
import { DashboardScreen } from './components/DashboardScreen';
import { PurchasesScreen } from './components/PurchasesScreen';
import { SalesScreen } from './components/SalesScreen';
import { SaleDetailsScreen } from './components/SaleDetailsScreen';
import { PreOrdersScreen } from './components/PreOrdersScreen';
import { WalletScreen } from './components/WalletScreen';
import { MortalityScreen } from './components/MortalityScreen';
import { ExpensesScreen } from './components/ExpensesScreen';
import { DebtsScreen } from './components/DebtsScreen';
import { DriversScreen } from './components/DriversScreen';
import { ReportsScreen } from './components/ReportsScreen';
import { CalculatorScreen } from './components/CalculatorScreen';
import {
  LayoutDashboard,
  ShoppingCart,
  TrendingUp,
  PackageCheck,
  BarChart3,
  Menu
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // State initialized to empty arrays so the user can enter all records manually from zero
  const [purchases, setPurchases] = useState<PurchaseRecord[]>(() => {
    const saved = localStorage.getItem('kurd_poultry_v2_purchases');
    return saved ? JSON.parse(saved) : [];
  });

  const [sales, setSales] = useState<SaleRecord[]>(() => {
    const saved = localStorage.getItem('kurd_poultry_v2_sales');
    return saved ? JSON.parse(saved) : [];
  });

  const [preOrders, setPreOrders] = useState<PreOrderRecord[]>(() => {
    const saved = localStorage.getItem('kurd_poultry_v2_preorders');
    return saved ? JSON.parse(saved) : [];
  });

  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(() => {
    const saved = localStorage.getItem('kurd_poultry_v2_wallet');
    return saved ? JSON.parse(saved) : [];
  });

  const [mortalities, setMortalities] = useState<MortalityRecord[]>(() => {
    const saved = localStorage.getItem('kurd_poultry_v2_mortalities');
    return saved ? JSON.parse(saved) : [];
  });

  const [expenses, setExpenses] = useState<ExpenseRecord[]>(() => {
    const saved = localStorage.getItem('kurd_poultry_v2_expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [debts, setDebts] = useState<DebtRecord[]>(() => {
    const saved = localStorage.getItem('kurd_poultry_v2_debts');
    return saved ? JSON.parse(saved) : [];
  });

  const [drivers, setDrivers] = useState<DriverRecord[]>(() => {
    const saved = localStorage.getItem('kurd_poultry_v2_drivers');
    return saved ? JSON.parse(saved) : initialDrivers;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('kurd_poultry_v2_purchases', JSON.stringify(purchases));
  }, [purchases]);

  useEffect(() => {
    localStorage.setItem('kurd_poultry_v2_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('kurd_poultry_v2_preorders', JSON.stringify(preOrders));
  }, [preOrders]);

  useEffect(() => {
    localStorage.setItem('kurd_poultry_v2_wallet', JSON.stringify(walletTransactions));
  }, [walletTransactions]);

  useEffect(() => {
    localStorage.setItem('kurd_poultry_v2_mortalities', JSON.stringify(mortalities));
  }, [mortalities]);

  useEffect(() => {
    localStorage.setItem('kurd_poultry_v2_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('kurd_poultry_v2_debts', JSON.stringify(debts));
  }, [debts]);

  useEffect(() => {
    localStorage.setItem('kurd_poultry_v2_drivers', JSON.stringify(drivers));
  }, [drivers]);

  // Clean wipe / Reset all data handler
  const handleResetAllData = () => {
    if (window.confirm('ئایا دڵنیایت لە سفرکردنەوەی هەموو داتاکان؟ هەموو تۆمارەکان سفر دەبنەوە.')) {
      setPurchases([]);
      setSales([]);
      setPreOrders([]);
      setWalletTransactions([]);
      setMortalities([]);
      setExpenses([]);
      setDebts([]);
      localStorage.removeItem('kurd_poultry_v2_purchases');
      localStorage.removeItem('kurd_poultry_v2_sales');
      localStorage.removeItem('kurd_poultry_v2_preorders');
      localStorage.removeItem('kurd_poultry_v2_wallet');
      localStorage.removeItem('kurd_poultry_v2_mortalities');
      localStorage.removeItem('kurd_poultry_v2_expenses');
      localStorage.removeItem('kurd_poultry_v2_debts');
      localStorage.removeItem('kurd_poultry_purchases');
      localStorage.removeItem('kurd_poultry_sales');
      localStorage.removeItem('kurd_poultry_preorders');
      localStorage.removeItem('kurd_poultry_wallet');
      localStorage.removeItem('kurd_poultry_mortalities');
      localStorage.removeItem('kurd_poultry_expenses');
      localStorage.removeItem('kurd_poultry_debts');
    }
  };

  // Handlers for purchases
  const handleAddPurchase = (item: Omit<PurchaseRecord, 'id' | 'totalAmount'>) => {
    const newRecord: PurchaseRecord = {
      ...item,
      id: `pur-${Date.now()}`,
      totalAmount: item.chicksCount * item.pricePerChick
    };
    setPurchases([newRecord, ...purchases]);
  };

  const handleDeletePurchase = (id: string) => {
    setPurchases(purchases.filter((p) => p.id !== id));
  };

  // Handlers for sales
  const handleAddSale = (item: Omit<SaleRecord, 'id' | 'totalAmount' | 'status'>) => {
    const newRecord: SaleRecord = {
      ...item,
      id: `sale-${Date.now()}`,
      totalAmount: item.chicksCount * item.pricePerChick,
      status: item.arrived ? 'arrived' : 'order_pending'
    };
    setSales([newRecord, ...sales]);
  };

  const handleUpdateSaleStatus = (
    id: string,
    status: 'order_pending' | 'arrived' | 'cancelled'
  ) => {
    setSales(
      sales.map((s) =>
        s.id === id ? { ...s, status, arrived: status === 'arrived' } : s
      )
    );
  };

  const handleDeleteSale = (id: string) => {
    setSales(sales.filter((s) => s.id !== id));
  };

  // Handlers for pre-orders
  const handleAddPreOrder = (item: Omit<PreOrderRecord, 'id'>) => {
    const newRecord: PreOrderRecord = {
      ...item,
      id: `pre-${Date.now()}`
    };
    setPreOrders([newRecord, ...preOrders]);
  };

  const handleUpdatePreOrderStatus = (id: string, status: 'waiting' | 'completed') => {
    setPreOrders(preOrders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const handleDeletePreOrder = (id: string) => {
    setPreOrders(preOrders.filter((o) => o.id !== id));
  };

  // Handlers for wallet
  const handleAddWalletTransaction = (t: Omit<WalletTransaction, 'id'>) => {
    const newRecord: WalletTransaction = {
      ...t,
      id: `w-${Date.now()}`
    };
    setWalletTransactions([newRecord, ...walletTransactions]);
  };

  // Handlers for mortalities
  const handleAddMortality = (m: Omit<MortalityRecord, 'id' | 'estimatedLossIqd'>) => {
    const averagePrice = 1389;
    const newRecord: MortalityRecord = {
      ...m,
      id: `mor-${Date.now()}`,
      estimatedLossIqd: m.chicksCount * averagePrice
    };
    setMortalities([newRecord, ...mortalities]);
  };

  const handleDeleteMortality = (id: string) => {
    setMortalities(mortalities.filter((m) => m.id !== id));
  };

  // Handlers for expenses
  const handleAddExpense = (e: Omit<ExpenseRecord, 'id'>) => {
    const newRecord: ExpenseRecord = {
      ...e,
      id: `exp-${Date.now()}`
    };
    setExpenses([newRecord, ...expenses]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  // Handlers for debts
  const handleAddDebt = (d: Omit<DebtRecord, 'id' | 'isSettled'>) => {
    const newRecord: DebtRecord = {
      ...d,
      id: `debt-${Date.now()}`,
      remainingAmount: d.remainingAmount !== undefined ? d.remainingAmount : d.amount,
      repayments: d.repayments || [],
      isSettled: false
    };
    setDebts([newRecord, ...debts]);
  };

  const handleRepayDebt = (debtId: string, amount: number, date: string, notes?: string) => {
    setDebts((prevDebts) =>
      prevDebts.map((d) => {
        if (d.id !== debtId) return d;
        const currentRemaining = d.remainingAmount !== undefined ? d.remainingAmount : d.amount;
        const newRemaining = Math.max(0, currentRemaining - amount);
        const newRepayment = {
          id: `rep-${Date.now()}`,
          amount,
          date: date || new Date().toISOString().split('T')[0],
          notes: notes?.trim()
        };
        const updatedRepayments = [...(d.repayments || []), newRepayment];
        return {
          ...d,
          remainingAmount: newRemaining,
          isSettled: newRemaining === 0,
          repayments: updatedRepayments
        };
      })
    );
  };

  const handleAddExistingDebt = (debtId: string, additionalAmount: number, date: string, notes?: string) => {
    setDebts((prevDebts) =>
      prevDebts.map((d) => {
        if (d.id !== debtId) return d;
        const currentRemaining = d.remainingAmount !== undefined ? d.remainingAmount : d.amount;
        return {
          ...d,
          amount: d.amount + additionalAmount,
          remainingAmount: currentRemaining + additionalAmount,
          isSettled: false,
          notes: notes ? (d.notes ? `${d.notes} | ${notes}` : notes) : d.notes
        };
      })
    );
  };

  const handleToggleDebtSettled = (id: string) => {
    setDebts(
      debts.map((d) => {
        if (d.id === id) {
          const nextSettled = !d.isSettled;
          return {
            ...d,
            isSettled: nextSettled,
            remainingAmount: nextSettled ? 0 : d.amount
          };
        }
        return d;
      })
    );
  };

  const handleDeleteDebt = (id: string) => {
    setDebts(debts.filter((d) => d.id !== id));
  };

  // Handlers for drivers
  const handleAddDriver = (d: Omit<DriverRecord, 'id'>) => {
    const newRecord: DriverRecord = {
      ...d,
      id: `drv-${Date.now()}`
    };
    setDrivers([newRecord, ...drivers]);
  };

  const handleDeleteDriver = (id: string) => {
    setDrivers(drivers.filter((d) => d.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F0ECE1] flex flex-col items-center justify-start sm:py-4 selection:bg-emerald-200 font-['Vazirmatn',sans-serif]">
      {/* Clean Application Container - Mobile-first width without fake phone frame */}
      <div className="w-full sm:max-w-[460px] min-h-screen sm:min-h-[890px] bg-[#FAF7F2] sm:rounded-3xl shadow-xl flex flex-col overflow-hidden relative sm:border sm:border-[#E8E2D6]">
        {/* Navigation Drawer */}
        <NavigationDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          activeTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            setIsDrawerOpen(false);
          }}
          onResetAllData={handleResetAllData}
        />

        {/* Dynamic Screen View */}
        <div className="flex-1 overflow-y-auto pb-16">
          {currentTab === 'dashboard' && (
            <DashboardScreen
              purchases={purchases}
              sales={sales}
              expenses={expenses}
              walletTransactions={walletTransactions}
              mortalities={mortalities}
              onOpenDrawer={() => setIsDrawerOpen(true)}
              onNavigate={(tab) => setCurrentTab(tab)}
              onResetAllData={handleResetAllData}
            />
          )}

          {currentTab === 'purchases' && (
            <PurchasesScreen
              purchases={purchases}
              onAddPurchase={handleAddPurchase}
              onDeletePurchase={handleDeletePurchase}
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />
          )}

          {currentTab === 'sales' && (
            <SalesScreen
              sales={sales}
              onAddSale={handleAddSale}
              onDeleteSale={handleDeleteSale}
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />
          )}

          {currentTab === 'sale_details' && (
            <SaleDetailsScreen
              sales={sales}
              onUpdateStatus={handleUpdateSaleStatus}
              onDeleteSale={handleDeleteSale}
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />
          )}

          {currentTab === 'preorders' && (
            <PreOrdersScreen
              preOrders={preOrders}
              onAddPreOrder={handleAddPreOrder}
              onUpdateStatus={handleUpdatePreOrderStatus}
              onDeletePreOrder={handleDeletePreOrder}
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />
          )}

          {currentTab === 'wallet' && (
            <WalletScreen
              transactions={walletTransactions}
              onAddTransaction={handleAddWalletTransaction}
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />
          )}

          {currentTab === 'mortality' && (
            <MortalityScreen
              mortalities={mortalities}
              onAddMortality={handleAddMortality}
              onDeleteMortality={handleDeleteMortality}
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />
          )}

          {currentTab === 'expenses' && (
            <ExpensesScreen
              expenses={expenses}
              onAddExpense={handleAddExpense}
              onDeleteExpense={handleDeleteExpense}
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />
          )}

          {currentTab === 'debts' && (
            <DebtsScreen
              debts={debts}
              onAddDebt={handleAddDebt}
              onRepayDebt={handleRepayDebt}
              onAddExistingDebt={handleAddExistingDebt}
              onToggleSettled={handleToggleDebtSettled}
              onDeleteDebt={handleDeleteDebt}
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />
          )}

          {currentTab === 'drivers' && (
            <DriversScreen
              drivers={drivers}
              onAddDriver={handleAddDriver}
              onDeleteDriver={handleDeleteDriver}
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />
          )}

          {currentTab === 'reports' && (
            <ReportsScreen
              purchases={purchases}
              sales={sales}
              expenses={expenses}
              mortalities={mortalities}
              debts={debts}
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />
          )}

          {currentTab === 'calculator' && (
            <CalculatorScreen onOpenDrawer={() => setIsDrawerOpen(true)} />
          )}
        </div>

        {/* Bottom Quick Navigation Bar for Easy Mobile Browsing */}
        <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#E8E2D6] px-2 py-1.5 flex items-center justify-around z-20 font-['Vazirmatn',sans-serif]">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`flex flex-col items-center gap-0.5 text-[9.5px] font-bold cursor-pointer transition ${
              currentTab === 'dashboard' ? 'text-emerald-800' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>سه ره كى</span>
          </button>

          <button
            onClick={() => setCurrentTab('purchases')}
            className={`flex flex-col items-center gap-0.5 text-[9.5px] font-bold cursor-pointer transition ${
              currentTab === 'purchases' ? 'text-emerald-800' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>كرينه كان</span>
          </button>

          <button
            onClick={() => setCurrentTab('sales')}
            className={`flex flex-col items-center gap-0.5 text-[9.5px] font-bold cursor-pointer transition ${
              currentTab === 'sales' ? 'text-emerald-800' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>فروشتنه كان</span>
          </button>

          <button
            onClick={() => setCurrentTab('sale_details')}
            className={`flex flex-col items-center gap-0.5 text-[9.5px] font-bold cursor-pointer transition ${
              currentTab === 'sale_details' ? 'text-emerald-800' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <PackageCheck className="w-3.5 h-3.5" />
            <span>ناردنه كان</span>
          </button>

          <button
            onClick={() => setCurrentTab('reports')}
            className={`flex flex-col items-center gap-0.5 text-[9.5px] font-bold cursor-pointer transition ${
              currentTab === 'reports' ? 'text-emerald-800' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>راپۆرت</span>
          </button>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex flex-col items-center gap-0.5 text-[9.5px] font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            <Menu className="w-3.5 h-3.5" />
            <span>مینیو</span>
          </button>
        </div>
      </div>
    </div>
  );
}
