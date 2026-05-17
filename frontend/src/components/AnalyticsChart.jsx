import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { COLORS }from "../constants/colors" // Clean, modern color palette for your financial categories

const AnalyticsChart = ({ transactions }) => {
  // 1. Filter out income entries (we only want to map spending breakdown)
  const expensesOnly = transactions.filter(tx => tx.type === 'expense');

  // 2. Aggregate total amounts grouped by category
  const categoryTotals = expensesOnly.reduce((acc, tx) => {
    const amount = Number(tx.amount) || 0;
    acc[tx.category] = (acc[tx.category] || 0) + amount;
    return acc;
  }, {});

  // 3. Format the data object so Recharts can read it [{ name: 'Food', value: 500 }]
  const data = Object.keys(categoryTotals).map(category => ({
    name: category,
    value: categoryTotals[category]
  }));

  if (data.length === 0) {
    return (
      <div className="h-[240px] flex items-center justify-center text-xs font-semibold text-slate-400 border border-dashed border-slate-100 rounded-2xl bg-slate-50/30">
        No expense entries logged to generate insights.
      </div>
    );
  }

  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60} // Creates a clean donut styling
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`$${value.toLocaleString()}`, 'Total Spent']}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9' }}
          />
          <Legend 
            iconType="circle" 
            layout="vertical" 
            verticalAlign="middle" 
            align="right"
            wrapperStyle={{ fontSize: '11px', paddingLeft: '10px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;