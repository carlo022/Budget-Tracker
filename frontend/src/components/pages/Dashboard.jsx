import React, { useState, useEffect } from 'react';
import StatCard from '../StatCard';
import AddTransaction from '../AddTransaction';
import TransactionItem from '../TransactionItem';
import EmptyState from '../EmptyState';
import { CATEGORIES } from '../../constants/categories';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactions, resetBudget } from '../../features/budget/budgetSlice';
import { useNavigate } from 'react-router-dom';
import AnalyticsChart from '../AnalyticsChart';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { transactions, isLoading } = useSelector((state) => state.budget);

  // Filter options state
  const [activeFilter, setActiveFilter] = useState('All');
  const filterOptions = ['All', ...CATEGORIES];

useEffect(() => {
  dispatch(getTransactions());

  return () => dispatch(resetBudget());
}, [dispatch]);

  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

  const filteredTransactions = transactions.filter((tx) => {
    if (activeFilter === 'All') return true;
    return tx.category === activeFilter;
  });

  if (isLoading) return <div className="text-center py-20 font-bold">Loading Ledger...</div>;

return (
    <div className="space-y-8">
        {/* STAT CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Balance" amount={income - expenses} type="balance" />
          <StatCard title="Income" amount={income} type="income" />
          <StatCard title="Expenses" amount={expenses} type="expense" />
        </div>
        
        {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Form + Visual Analytics Chart */}
          <div className="flex flex-col gap-6">
            <AddTransaction />
            
          <div className="bg-white rounded-2xl shadow-sm border p-5">
            <h3 className="text-base font-bold text-slate-800 mb-4">Spending Breakdown</h3>
              <AnalyticsChart transactions={transactions} />
            </div>
          </div>
          
          {/* RIGHT COLUMN: History List Ledger */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-6 flex flex-col">
            {/* HISTORY HEADER & SELECT FILTER */}
            <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-bold text-slate-800">History</h3>
              
            {/* Styled Dropdown Select Menu */}
            <div className="relative w-full max-w-[160px]">
                <select
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none transition-all"
                >
                  {filterOptions.map((filter) => (
                  <option key={filter} value={filter}>
                      Filter: {filter}
                    </option>
                  ))}
                </select>
              {/* Subtle down-arrow chevron element indicator */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* CONDITIONAL LIST RENDER */}
            {filteredTransactions.length === 0 ? (
              <EmptyState 
                message={
                  activeFilter === 'All' 
                    ? "Your history is clean! Use the form to log your first income or expense transaction."
                    : `You don't have any transactions categorized under "${activeFilter}" yet.`
                } 
              />
            ) : (
            <div className="divide-y divide-slate-50">
                {filteredTransactions.map(tx => (
                  <TransactionItem key={tx._id} id={tx._id} {...tx} />
                ))}
              </div>
            )}
          </div>

      </div>
    </div>
  );
}

export default Dashboard;