import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CategoryPieChart = ({ transactions, categories }) => {
  const categoryData = useMemo(() => {
    // Initialize map with all categories at 0
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.id] = {
        name: cat.name,
        value: 0,
        color: cat.color
      };
    });
    
    // Sum up transaction amounts by category
    transactions.forEach(transaction => {
      if (categoryMap[transaction.categoryId]) {
        categoryMap[transaction.categoryId].value += transaction.amount;
      }
    });
    
    // Convert to array and filter out zero values
    return Object.values(categoryMap)
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [transactions, categories]);
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label" style={{ color: data.color }}>{data.name}</p>
          <p className="tooltip-value">${data.value.toFixed(2)}</p>
          <p className="tooltip-percent">
            {((data.value / categoryData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };
  
  const CustomLegend = ({ payload }) => {
    return (
      <ul className="custom-legend">
        {payload.map((entry, index) => (
          <li key={`legend-${index}`} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: entry.color }}></div>
            <span className="legend-text">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };
  
  if (categoryData.length === 0) {
    return (
      <div className="empty-chart">
        <p>No category data available</p>
      </div>
    );
  }
  
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            animationDuration={1000}
            animationEasing="ease-out"
          >
            {categoryData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
