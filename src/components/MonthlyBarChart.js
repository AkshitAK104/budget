import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function getMonthlyData(transactions) {
  const map = {};
  transactions.forEach(t => {
    const month = t.date?.slice(0, 7) || '';
    map[month] = (map[month] || 0) + t.amount;
  });
  return Object.entries(map).map(([month, amount]) => ({ month, amount }));
}

function MonthlyBarChart({ transactions }) {
  const data = getMonthlyData(transactions);
  if (data.length === 0) return null;
  
  return (
    <div className="glass card chart-card" style={{ height: '220px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#6366f1" radius={[8,8,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyBarChart;
