import React, { useState, useEffect } from 'react';
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CategoryManager from './components/CategoryManager';
import BudgetPlanner from './components/BudgetPlanner';
import DashboardSummary from './components/DashboardSummary';
import AnimatedCard from './components/AnimatedCard';
import MonthlyExpenseChart from './components/charts/MonthlyExpenseChart';
import CategoryPieChart from './components/charts/CategoryPieChart';
import BudgetProgressChart from './components/charts/BudgetProgressChart';

const App = () => {
  // State for transactions, categories, budgets
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [activeView, setActiveView] = useState('dashboard');
  const [theme, setTheme] = useState('dark');

  // Mock data if no real data is provided
  const mockData = {
    transactions: [
      { id: 1, description: 'Groceries', categoryId: 1, amount: 50, date: '2025-04-15', note: 'Weekly shopping' },
      { id: 2, description: 'Taxi Ride', categoryId: 2, amount: 20, date: '2025-04-16' },
      { id: 3, description: 'Movie Ticket', categoryId: 3, amount: 15, date: '2025-04-17' },
      { id: 4, description: 'Lunch with friends', categoryId: 1, amount: 30, date: '2025-04-18' },
      { id: 5, description: 'Bus Fare', categoryId: 2, amount: 5, date: '2025-04-19' },
      { id: 6, description: 'Concert Ticket', categoryId: 3, amount: 40, date: '2025-04-20' },
      { id: 7, description: 'Dinner at restaurant', categoryId: 1, amount: 60, date: '2025-04-21' },
      { id: 8, description: 'Train Ticket', categoryId: 2, amount: 25, date: '2025-04-22' },
      { id: 9, description: 'Movie Snack', categoryId: 3, amount: 10, date: '2025-03-23' },
      { id: 10, description: 'Shopping', categoryId: 1, amount: 100, date: '2025-03-24' },
    ],
    categories: [
      { id: 1, name: 'Food', color: '#FF5E5B' },
      { id: 2, name: 'Transport', color: '#39A0ED' },
      { id: 3, name: 'Entertainment', color: '#4ECDC4' },
      { id: 4, name: 'Utilities', color: '#FFDD4A' },
      { id: 5, name: 'Healthcare', color: '#A36AF9' },
    ],
    budgets: [
      { id: 1, categoryId: 1, amount: 500 },
      { id: 2, categoryId: 2, amount: 300 },
      { id: 3, categoryId: 3, amount: 200 },
      { id: 4, categoryId: 4, amount: 150 },
      { id: 5, categoryId: 5, amount: 100 },
    ],
  };
  

  // Set mock data if state is empty
  useEffect(() => {
    if (transactions.length === 0 || categories.length === 0 || budgets.length === 0) {
      setTransactions(mockData.transactions);
      setCategories(mockData.categories);
      setBudgets(mockData.budgets);
    }
  }, [transactions, categories, budgets]);

  // Total spent by category
  const categoryTotals = transactions.reduce((totals, t) => {
    totals[t.categoryId] = (totals[t.categoryId] || 0) + t.amount;
    return totals;
  }, {});

  // Theme toggle function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Handlers for adding transactions, categories, and budgets
  const handleAddTransaction = (transaction) => {
    setTransactions([
      {
        ...transaction,
        id: Date.now(),
        date: transaction.date || new Date().toISOString().split('T')[0],
      },
      ...transactions, // Prepend the new transaction to the list
    ]);
  };
  

  const handleAddCategory = (category) => {
    const colors = ['#FF5E5B', '#39A0ED', '#4ECDC4', '#FFDD4A', '#A36AF9', '#F39237'];
    setCategories([
      ...categories,
      {
        ...category,
        id: Date.now(),
        color: category.color || colors[Math.floor(Math.random() * colors.length)],
      },
    ]);
  };

  const handleAddBudget = (budget) => {
    setBudgets([...budgets, { ...budget, id: Date.now() }]);
  };

  return (
    <div className={`app ${theme}`}>
      <div className="app-background">
        <div className="gradient-blob"></div>
        <div className="gradient-blob secondary"></div>
      </div>

      <header className="app-header">
        <h1 className="app-title">
          <span className="neon-text">AK</span>
          <span className="flux-text">Flux</span>
        </h1>
        <nav className="app-nav">
          <button
            className={activeView === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveView('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={activeView === 'transactions' ? 'active' : ''}
            onClick={() => setActiveView('transactions')}
          >
            Transactions
          </button>
          <button
            className={activeView === 'categories' ? 'active' : ''}
            onClick={() => setActiveView('categories')}
          >
            Categories
          </button>
          <button
            style={{ display: 'none' }}
            className={activeView === 'budgets' ? 'active' : ''}
            onClick={() => setActiveView('budgets')}
          >
            Budgets
          </button>
        </nav>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="app-content">
        {activeView === 'dashboard' && (
          <>
            <DashboardSummary
              transactions={transactions}
              categories={categories}
              budgets={budgets}
              categoryTotals={categoryTotals}
            />

            <div className="dashboard-charts">
              <AnimatedCard title="Monthly Expenses" className="chart-card">
                <MonthlyExpenseChart transactions={transactions} />
              </AnimatedCard>

              <AnimatedCard title="Spending by Category" className="chart-card">
                <CategoryPieChart
                  transactions={transactions}
                  categories={categories}
                />
              </AnimatedCard>

              <AnimatedCard title="Budget Status" className="chart-card wide">
                <BudgetProgressChart
                  budgets={budgets}
                  categories={categories}
                  categoryTotals={categoryTotals}
                />
              </AnimatedCard>
            </div>

            <AnimatedCard title="Recent Transactions" className="recent-transactions">
              <TransactionList
                transactions={transactions.slice(0, 5)}
                categories={categories}
                compact={true}
              />
            </AnimatedCard>
          </>
        )}

        {activeView === 'transactions' && (
          <>
            <AnimatedCard title="Add Transaction" className="form-card">
              <TransactionForm
                onAddTransaction={handleAddTransaction}
                categories={categories}
              />
            </AnimatedCard>

            <AnimatedCard title="Transaction History" className="list-card">
              <TransactionList
                transactions={transactions}
                categories={categories}
              />
            </AnimatedCard>

            <AnimatedCard title="Monthly Breakdown" className="chart-card wide">
              <MonthlyExpenseChart transactions={transactions} />
            </AnimatedCard>
          </>
        )}

        {activeView === 'categories' && (
          <>
            <AnimatedCard title="Manage Categories" className="form-card">
              <CategoryManager
                categories={categories}
                onAddCategory={handleAddCategory}
                onUpdateCategory={(id, updates) => {
                  setCategories(
                    categories.map((cat) =>
                      cat.id === id ? { ...cat, ...updates } : cat
                    )
                  );
                }}
                onDeleteCategory={(id) => {
                  setCategories(categories.filter((cat) => cat.id !== id));
                }}
              />
            </AnimatedCard>

            <AnimatedCard title="Category Distribution" className="chart-card">
              <CategoryPieChart
                transactions={transactions}
                categories={categories}
              />
            </AnimatedCard>
          </>
        )}

        {activeView === 'budgets' && (
          <>
            <AnimatedCard title="Budget Planning" className="form-card">
              <BudgetPlanner
                budgets={budgets}
                categories={categories}
                onAddBudget={handleAddBudget}
                onUpdateBudget={(id, updates) => {
                  setBudgets(
                    budgets.map((budget) =>
                      budget.id === id ? { ...budget, ...updates } : budget
                    )
                  );
                }}
              />
            </AnimatedCard>

            <AnimatedCard title="Budget vs Actual" className="chart-card wide">
              <BudgetProgressChart
                budgets={budgets}
                categories={categories}
                categoryTotals={categoryTotals}
              />
            </AnimatedCard>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
