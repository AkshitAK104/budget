import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine,Cell } from 'recharts';

const BudgetProgressChart = ({ budgets, categories, categoryTotals }) => {
  const chartData = useMemo(() => {
    return budgets.map(budget => {
      const category = categories.find(cat => cat.id === budget.categoryId) || {
        name: 'Unknown',
        color: '#ccc'
      };
      
      const spent = categoryTotals[budget.categoryId] || 0;
      const remaining = budget.amount - spent;
      const percentSpent = (spent / budget.amount) * 100;
      
      return {
        name: category.name,
        budget: budget.amount,
        spent: spent,
        remaining: remaining > 0 ? remaining : 0,
        overspent: remaining < 0 ? Math.abs(remaining) : 0,
        percentSpent,
        color: category.color
      };
    });
  }, [budgets, categories, categoryTotals]);
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">Budget: ${payload[0].payload.budget.toFixed(2)}</p>
          <p className="tooltip-value">Spent: ${payload[0].payload.spent.toFixed(2)}</p>
          <p className="tooltip-value">
            {payload[0].payload.percentSpent.toFixed(0)}% of budget
          </p>
        </div>
      );
    }
    return null;
  };
  
  if (chartData.length === 0) {
    return (
      <div className="empty-chart">
        <p>No budget data available</p>
      </div>
    );
  }
  
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barGap={0}
          barCategoryGap={20}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine y={0} stroke="rgba(255,255,255,0.5)" />
          <Bar 
            dataKey="budget" 
            fill="rgba(255,255,255,0.2)" 
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={1}
            name="Budget"
          />
          <Bar 
            dataKey="spent" 
            name="Spent"
            radius={[4, 4, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`spent-${index}`} 
                fill={entry.percentSpent > 100 ? 'var(--danger)' : entry.color} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetProgressChart;
