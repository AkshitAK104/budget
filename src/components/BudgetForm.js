import React, { useState } from 'react';

function BudgetForm({ categories, onAdd }) {
  const [form, setForm] = useState({ 
    category: categories[0]?.name || '', 
    amount: '' 
  });
  
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.category || !form.amount) return;
    onAdd({ ...form, amount: Number(form.amount) });
    setForm({ ...form, amount: '' });
  }
  
  return (
    <form onSubmit={handleSubmit} className="glass card form-row">
      <select name="category" value={form.category} onChange={handleChange}>
        {categories.map((c, i) => (
          <option key={i} value={c.name}>{c.name}</option>
        ))}
      </select>
      <input 
        name="amount" 
        type="number" 
        placeholder="Budget Amount" 
        value={form.amount} 
        onChange={handleChange} 
        required 
      />
      <button type="submit">Set Budget</button>
    </form>
  );
}

export default BudgetForm;
