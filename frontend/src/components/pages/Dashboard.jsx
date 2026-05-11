import React from 'react'
import StatCard from '../StatCard';
import AddTransaction from '../AddTransaction';
import TransactionItem from '../TransactionItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactions, resetBudget } from '../../features/budget/budgetSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
 const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { transactions, isLoading } = useSelector((state) => state.budget);

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect if not logged in
    } else {
      dispatch(getTransactions());
    }

    return () => dispatch(resetBudget());
  }, [user, navigate, dispatch]);

  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

  if (isLoading) return <div className="text-center py-20 font-bold">Loading Ledger...</div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Balance" amount={income - expenses} type="balance" />
        <StatCard title="Income" amount={income} type="income" />
        <StatCard title="Expenses" amount={expenses} type="expense" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <AddTransaction />
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-6">
          <h3 className="text-lg font-bold mb-4">History</h3>
          {transactions.map(tx => (
            <TransactionItem key={tx._id} id={tx._id} {...tx} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard
