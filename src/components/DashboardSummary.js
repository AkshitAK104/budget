import React from 'react';
import AnimatedCard from './AnimatedCard';

const DashboardSummary = ({ transactions, categories, budgets, categoryTotals }) => {
  // Calculate key metrics
  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  
  const getBudgetTotal = () => {
    return budgets.reduce((sum, b) => sum + b.amount, 0);
  };
  
  const getPercentSpent = () => {
    const total = getBudgetTotal();
    if (total === 0) return 0;
    return (totalSpent / total) * 100;
  };
  
  const getCategoryById = (id) => {
    return categories.find(cat => cat.id === id) || { name: 'Unknown', color: '#ccc' };
  };
  
  const getTopCategory = () => {
    if (transactions.length === 0) return null;
    
    const categorySpending = {};
    transactions.forEach(t => {
      categorySpending[t.categoryId] = (categorySpending[t.categoryId] || 0) + t.amount;
    });
    
    let topCategoryId = null;
    let topAmount = 0;
    
    Object.entries(categorySpending).forEach(([catId, amount]) => {
      if (amount > topAmount) {
        topCategoryId = catId;
        topAmount = amount;
      }
    });
    
    if (!topCategoryId) return null;
    
    const category = getCategoryById(topCategoryId);
    return {
      ...category,
      amount: topAmount
    };
  };
  
  const getLatestTransaction = () => {
    if (transactions.length === 0) return null;
    
    return transactions.reduce((latest, current) => {
      return (current.timestamp > latest.timestamp) ? current : latest;
    }, transactions[0]);
  };
  
  const getRemainingBudget = () => {
    const total = getBudgetTotal();
    return total - totalSpent;
  };
  
  const topCategory = getTopCategory();
  const latestTransaction = getLatestTransaction();
  
  return (
    <div className="dashboard-summary">
      <AnimatedCard className="stat-card" icon="💰">
        <h3>Total Spent</h3>
        <div className="stat-value">${totalSpent.toFixed(2)}</div>
        <div className="stat-subtitle">
          {getPercentSpent() > 100 ? (
            <span className="stat-warning">
              {getPercentSpent().toFixed(0)}% of budget
            </span>
          ) : (
            <span className="stat-normal">
              {getPercentSpent().toFixed(0)}% of budget
            </span>
          )}
        </div>
      </AnimatedCard>
      
      <AnimatedCard className="stat-card" icon="💵">
        <h3>Remaining Budget</h3>
        <div className={`stat-value ${getRemainingBudget() < 0 ? 'negative' : ''}`}>
          ${getRemainingBudget().toFixed(2)}
        </div>
        <div className="stat-subtitle">
          of ${getBudgetTotal().toFixed(2)} total
        </div>
      </AnimatedCard>
      
      <AnimatedCard className="stat-card" icon="🔝">
        <h3>Top Category</h3>
        {topCategory ? (
          <>
            <div className="stat-value" style={{ color: topCategory.color }}>
              {topCategory.name}
            </div>
            <div className="stat-subtitle">
              ${topCategory.amount.toFixed(2)}
            </div>
          </>
        ) : (
          <div className="stat-value">No data yet--(Add in transaction)</div>
        )}
      </AnimatedCard>
      
      <AnimatedCard className="stat-card" icon="🕒">
        <h3>Latest Transaction</h3>
        {latestTransaction ? (
          <>
            <div className="stat-value">
              {latestTransaction.description}
            </div>
            <div className="stat-subtitle">
              ${latestTransaction.amount.toFixed(2)} on {latestTransaction.date}
            </div>
          </>
        ) : (
          <div className="stat-value">No transactions yet</div>
        )}
      </AnimatedCard>
    </div>
  );
};

export default DashboardSummary;
