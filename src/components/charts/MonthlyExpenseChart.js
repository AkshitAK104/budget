import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MonthlyExpenseChart = ({ transactions }) => {
  const monthlyData = useMemo(() => {
    const months = {
      '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', 
      '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
      '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
    };
    
    const monthlyTotals = {};
    
    // Initialize with zero values for all months
    Object.keys(months).forEach(month => {
      const currentYear = new Date().getFullYear();
      monthlyTotals[`${currentYear}-${month}`] = 0;
    });
    
    // Add transaction amounts to respective months
    transactions.forEach(transaction => {
      const month = transaction.date.substring(0, 7); // YYYY-MM
      monthlyTotals[month] = (monthlyTotals[month] || 0) + transaction.amount;
    });
    
    // Convert to array format for chart
    return Object.entries(monthlyTotals).map(([monthKey, amount]) => {
      const [year, monthNum] = monthKey.split('-');
      return {
        month: `${months[monthNum]}`,
        amount: amount
      };
    }).sort((a, b) => {
      const monthOrder = Object.values(months);
      return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    });
  }, [transactions]);
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}: $${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={monthlyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.8} />
              <stop offset="100%" stopColor="var(--primary-light)" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <Bar 
            dataKey="amount" 
            fill="url(#barGradient)" 
            radius={[4, 4, 0, 0]} 
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpenseChart;
