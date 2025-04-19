import React, { useState } from 'react';

const CategoryManager = ({ categories, onAddCategory, onUpdateCategory, onDeleteCategory }) => {
  const [newCategory, setNewCategory] = useState({ name: '', color: '#6c5ce7' });
  const [editingId, setEditingId] = useState(null);

  // Predefined colors for categories
  const colorOptions = [
    '#6c5ce7', '#00cec9', '#fd79a8', '#fdcb6e', 
    '#ff7675', '#55efc4', '#e84393', '#74b9ff'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;
    
    onAddCategory(newCategory);
    setNewCategory({ name: '', color: colorOptions[0] });
  };

  const handleUpdate = (id) => {
    const category = categories.find(cat => cat.id === id);
    if (!category) return;
    
    setNewCategory({ name: category.name, color: category.color });
    setEditingId(id);
  };

  const submitUpdate = (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;
    
    onUpdateCategory(editingId, newCategory);
    setNewCategory({ name: '', color: colorOptions[0] });
    setEditingId(null);
  };

  const cancelEdit = () => {
    setNewCategory({ name: '', color: colorOptions[0] });
    setEditingId(null);
  };

  return (
    <div className="category-manager">
      <form onSubmit={editingId ? submitUpdate : handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category-name">Category Name</label>
            <input
              type="text"
              id="category-name"
              className="form-control"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              placeholder="Enter category name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category-color">Color</label>
            <div className="color-picker">
              {colorOptions.map(color => (
                <div 
                  key={color}
                  className={`color-option ${newCategory.color === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setNewCategory({ ...newCategory, color })}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="form-buttons">
          {editingId ? (
            <>
              <button type="submit" className="btn btn-primary">Update</button>
              <button type="button" className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <button type="submit" className="btn btn-primary">Add Category</button>
          )}
        </div>
      </form>
      
      <div className="category-list">
        <h4>Existing Categories</h4>
        <ul>
          {categories.map(category => (
            <li key={category.id} className="category-item">
              <div 
                className="category-color" 
                style={{ backgroundColor: category.color }}
              ></div>
              <div className="category-name">{category.name}</div>
              <div className="category-actions">
                <button onClick={() => handleUpdate(category.id)} className="btn-icon">✏️</button>
                <button onClick={() => onDeleteCategory(category.id)} className="btn-icon">🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryManager;
