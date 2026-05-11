import React from 'react';

const StatCard = ({ title, amount, type }) => {
  const isNeutral = type === 'balance';
  const isIncome = type === 'income';

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
      <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
        {title}
      </span>
      <span className={`text-2xl font-bold mt-2 ${
        isNeutral ? 'text-slate-900' : isIncome ? 'text-emerald-600' : 'text-rose-600'
      }`}>
        {isIncome ? '+' : isNeutral ? '' : '-'}${Math.abs(amount).toLocaleString()}
      </span>
    </div>
  );
};

export default StatCard;