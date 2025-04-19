import React from 'react';

const TransactionList = ({ transactions, categories, compact = false }) => {
  // If no transactions, show empty state
  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <p>No transactions to display</p>
      </div>
    );
  }

  // Helper function to find category by ID
  const getCategoryById = (id) => {
    return categories.find(cat => cat.id === id) || { name: 'Uncategorized', color: '#ccc' };
  };

  return (
    <ul className="transaction-list">
      {transactions.map(transaction => {
        const category = getCategoryById(transaction.categoryId);
        
        return (
          <li key={transaction.id} className="transaction-item">
            <div 
              className="transaction-icon"
              style={{ background: `${category.color}20` }}
            >
              <span style={{ color: category.color }}>$</span>
            </div>
            
            <div className="transaction-details">
              <div className="transaction-title">{transaction.description}</div>
              <div className="transaction-meta">
                <span>{transaction.date}</span>
                {transaction.note && !compact && (
                  <span className="transaction-note"> • {transaction.note}</span>
                )}
              </div>
            </div>
            
            <div className="transaction-amount">
              ${transaction.amount.toFixed(2)}
            </div>
            
            <div 
              className="category-badge"
              style={{ 
                background: `${category.color}20`,
                color: category.color
              }}
            >
              {category.name}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TransactionList;
