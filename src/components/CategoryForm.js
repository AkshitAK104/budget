import React, { useState } from 'react';

function CategoryForm({ onAdd }) {
  const [name, setName] = useState('');
  
  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;
    onAdd({ name });
    setName('');
  }
  
  return (
    <form onSubmit={handleSubmit} className="glass card form-row">
      <input 
        value={name} 
        onChange={e => setName(e.target.value)} 
        placeholder="Category Name" 
        required 
      />
      <button type="submit">Add Category</button>
    </form>
  );
}

export default CategoryForm;
