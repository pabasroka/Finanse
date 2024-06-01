import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

const FinanceForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: localStorage.getItem('type') || 'income',
    category: 'Gifts',
    value: 0
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'type') {
      localStorage.setItem('type', e.target.value);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/finances', formData, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        }
      });
      alert('Finance entry created successfully!');
      setFormData({
        date: new Date().toISOString().split('T')[0],
        type: 'income',
        category: 'Gifts',
        value: 0
      });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Create Finance Entry</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date ?? new Date()}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="income">Income</option>
            <option value="outcome">Outcome</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category">Category:</label>
          <select 
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required>
            <option value="Gifts">Gifts</option>
            <option value="Groceries">Groceries</option>
            <option value="Transportation">Transportation</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Clothing">Clothing</option>
            <option value="Insurance">Insurance</option>
            <option value="Savings">Savings</option>
            </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="value">Value:</label>
          <input
            type="number"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default FinanceForm;
