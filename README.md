Personal Finance Visualizer
A modern, responsive React application to track your personal finances.
Easily add transactions, manage categories, set budgets, and visualize your spending with interactive charts—all in a beautiful glassmorphic dashboard.

🚀 Features
Add, edit, and delete transactions (amount, date, description, category)

Category management (create, edit, delete categories)

Budgeting (set, edit, and track monthly budgets per category)

Interactive charts (monthly expenses bar chart, category-wise pie chart, budget vs actual)

Dashboard summary (total expenses, recent transactions, top categories)

Responsive design (works on desktop and mobile)

Persistent data (all data saved in your browser’s localStorage)

Beautiful glassmorphic UI with subtle animations

🖼️ Screenshots
![Dashboard Screenshot](./screenshot with summary, charts, and transaction list*

🏗️ Folder Structure
text
src/
  components/
    AnimatedCard.js
    BudgetPlanner.js
    CategoryManager.js
    DashboardSummary.js
    GlassCard.js
    StatGrid.js
    TransactionForm.js
    TransactionList.js
    charts/
      MonthlyExpenseChart.js
      CategoryPieChart.js
      BudgetProgressChart.js
  App.js
  App.css
  index.js
  ...
🛠️ Getting Started
Prerequisites
Node.js (v16+ recommended)

npm (comes with Node.js)

Installation
Clone this repository (or download the source code):

bash
git clone https://github.com/your-username/personal-finance-visualizer.git
cd personal-finance-visualizer
Install dependencies:

bash
npm install
Run the app locally:

bash
npm start
The app will open at http://localhost:3000.
