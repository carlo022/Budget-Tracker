import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { COLORS }from "../constants/colors" // Clean, modern color palette for your financial categories
import { useState } from 'react';

const AnalyticsChart = ({ transactions = [] }) => {
  // State to track whether we are looking at 'expense' or 'income'
  const [chartType, setChartType] = useState('expense');

  // Safeguard in case transactions prop is null or undefined
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  // 1. Filter transactions based on the selected toggle type
  const filteredData = safeTransactions.filter(tx => tx && tx.type === chartType);

  // 2. Aggregate total amounts grouped by category
  const categoryTotals = filteredData.reduce((acc, tx) => {
    const amount = Number(tx.amount) || 0;
    acc[tx.category] = (acc[tx.category] || 0) + amount;
    return acc;
  }, {});

  // 3. Format the data object so Recharts can read it
  const data = Object.keys(categoryTotals).map(category => ({
    name: category,
    value: categoryTotals[category]
  }));

  return (
    <div className="space-y-4">
      {/* Dynamic Toggle Switch at the top of the chart */}
      <div className="flex items-center justify-between border-b pb-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {chartType === 'expense' ? 'Spending Breakdown' : 'Income Breakdown'}
        </span>
        
        <div className="flex bg-slate-100 p-0.5 rounded-lg border text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setChartType('expense')}
            className={`px-3 py-1 rounded-md transition-all ${
              chartType === 'expense'
                ? 'bg-white text-rose-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Expenses
          </button>
          <button
            type="button"
            onClick={() => setChartType('income')}
            className={`px-3 py-1 rounded-md transition-all ${
              chartType === 'income'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Income
          </button>
        </div>
      </div>

      {/* Render Chart or Empty State */}
      {data.length === 0 ? (
        <div className="h-[200px] flex items-center justify-center text-xs font-semibold text-slate-400 border border-dashed rounded-2xl bg-slate-50/50">
          No {chartType}s logged to generate insights.
        </div>
      ) : (
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50} // Clean donut styling
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Total']}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }}
              />
              <Legend 
                iconType="circle" 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                wrapperStyle={{ fontSize: '11px', paddingLeft: '5px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AnalyticsChart;