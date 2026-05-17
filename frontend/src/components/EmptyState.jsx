import React from 'react';
import { Wallet } from 'lucide-react';

const EmptyState = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
      <div className="p-4 bg-indigo-50 text-indigo-500 rounded-full mb-4">
        <Wallet size={32} />
      </div>
      <h4 className="text-base font-semibold text-slate-800 mb-1">No Transactions Found</h4>
      <p className="text-sm text-slate-500 max-w-sm">
        {message || "Your history is clean! Use the form to log your first income or expense transaction."}
      </p>
    </div>
  );
};

export default EmptyState;