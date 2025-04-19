import React, { useEffect, useState } from 'react';
import BudgetProgressChart from './BudgetProgressChart'; // Your chart component

// Sample data to show when real data is unavailable
const mockData = {
  budgets: [
    { categoryId: 1, amount: 500 },
    { categoryId: 2, amount: 300 },
    { categoryId: 3, amount: 700 },
  ],
  categories: [
    { id: 1, name: 'Groceries', color: '#4caf50' },
    { id: 2, name: 'Entertainment', color: '#ff9800' },
    { id: 3, name: 'Utilities', color: '#2196f3' },
  ],
  categoryTotals: {
    1: 400,
    2: 150,
    3: 600,
  },
};

const DataWrapper = ({ budgets, categories, categoryTotals }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // If no data is passed, use mock data
    if (!budgets || !categories || !categoryTotals) {
      setData(mockData); // Use mock data
    } else {
      setData({ budgets, categories, categoryTotals });
    }
  }, [budgets, categories, categoryTotals]);

  // If data is not available, show a loading state or message
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <BudgetProgressChart
      budgets={data.budgets}
      categories={data.categories}
      categoryTotals={data.categoryTotals}
    />
  );
};

export default DataWrapper;
