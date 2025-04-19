import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function getBudgetData(transactions, budgets) {
  return budgets.map(b => {
    const spent = transactions
      .filter(t => t.category === b.category)
      .reduce((sum, t) => sum + t.amount, 0);
    return { 
      category: b.category, 
      budget: b.amount, 
      spent 
    };
  });
}

function BudgetComparisonChart({ transactions, budgets }) {
  const data = getBudgetData(transactions, budgets);
  if (data.length === 0) return null;
  
  return (
    <div className="glass card chart-card" style={{ height: '220px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#a3e635" />
          <Bar dataKey="spent" fill="#f472b6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BudgetComparisonChart;
