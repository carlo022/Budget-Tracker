import React, { useState } from 'react';
import { Trash2, ArrowUpRight, ArrowDownLeft, Edit2, Check, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteTransaction, updateTransaction } from '../features/budget/budgetSlice';

const TransactionItem = ({ _id, name, amount, type, date }) => {
  const dispatch = useDispatch();
  const isIncome = type === 'income';

  // State for Editing
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name, amount });

  // Handle Delete
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteTransaction(_id));
    }
  };

  // Handle Update
  const handleUpdate = () => {
    const rawAmount = Number(String(editData.amount).replace(/,/g, ''));
    dispatch(updateTransaction({ 
      id: _id, 
      name: editData.name, 
      amount: rawAmount 
    }));
    setIsEditing(false);
  };

  return (
    <div className="group flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors border-b border-slate-50 last:border-0">
      <div className="flex items-center gap-4 flex-1">
        <div className={`p-2 rounded-full shrink-0 ${isIncome ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
          {isIncome ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
        </div>

        {isEditing ? (
          <input
            className="bg-white border border-indigo-200 rounded px-2 py-1 text-sm font-semibold text-slate-800 outline-none w-full max-w-[150px]"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            autoFocus
          />
        ) : (
          <div>
            <p className="font-semibold text-slate-800">{name}</p>
            <p className="text-xs text-slate-500">{date}</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="bg-white border border-indigo-200 rounded px-2 py-1 text-sm font-bold text-slate-800 outline-none w-24 text-right"
              value={editData.amount}
              onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
            />
            <button onClick={handleUpdate} className="text-emerald-500 hover:bg-emerald-50 p-1 rounded">
              <Check size={18} />
            </button>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:bg-slate-100 p-1 rounded">
              <X size={18} />
            </button>
          </div>
        ) : (
          <>
            <span className={`font-bold ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isIncome ? '+' : '-'}${Number(amount).toLocaleString()}
            </span>
            
            {/* Action Buttons - Visible on hover */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => setIsEditing(true)}
                className="p-1.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={handleDelete}
                className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionItem;