import React from 'react';
import { Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const TransactionItem = ({ name, amount, type, date }) => {
  const isIncome = type === 'income';

  return (
    <div className="group flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors border-b border-slate-50 last:border-0">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-full ${isIncome ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
          {isIncome ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
        </div>
        <div>
          <p className="font-semibold text-slate-800">{name}</p>
          <p className="text-xs text-slate-500">{date}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span className={`font-bold ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isIncome ? '+' : '-'}${amount}
        </span>
        <button className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;