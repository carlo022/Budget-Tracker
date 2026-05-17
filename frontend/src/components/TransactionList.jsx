import React, { useState } from "react";
import { CATEGORIES } from "../constants/categories";
import TransactionItem from "../components/TransactionItem";

const TransactionList = ({ transactions }) => {
  // 1. Manage state for the active filter tab
  const [activeFilter, setActiveFilter] = useState("All");

  // Create an array that has ['All', 'Food', 'Rent', ...]
  const filterOptions = ["All", ...CATEGORIES];

  // 2. Filter the array BEFORE mapping over it
  const filteredTransactions = transactions.filter((tx) => {
    if (activeFilter === "All") return true;
    return tx.category === activeFilter;
  });

  return (
    <div className="space-y-4">
      {/* FILTER BUTTONS BAR */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all whitespace-nowrap ${
              activeFilter === filter
                ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* TRANSACTION ROWS LIST */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <h3 className="text-base font-bold text-slate-800 mb-3">History</h3>
        
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-sm text-slate-400 border border-dashed border-slate-100 rounded-xl">
            No transactions found under "{activeFilter}"
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {filteredTransactions.map((tx) => (
              // Your exact TransactionItem component processing the filtered data
              <TransactionItem key={tx._id} {...tx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;