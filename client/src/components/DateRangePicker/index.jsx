import React, { useState } from 'react';
import styles from './styles.module.css';


const DateRangePicker = ({ onChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChangeDateFrom = (event) => {
    setStartDate(event.target.value);
    onChange(event.target.value, endDate);
  }

  const handleChangeDateTo = (event) => {
    setEndDate(event.target.value);
    onChange(startDate, event.target.value);
  }

  return (
    <div>
        <div className={styles.formGroup}>
          <label htmlFor="date">Date from:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={startDate ?? new Date()}
            onChange={handleChangeDateFrom}
            required
          />
        </div>

        <div className={styles.formGroup}>
            <label htmlFor="date">Date to:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={endDate ?? new Date()}
              onChange={handleChangeDateTo}
              required
            />
        </div>
    </div>
  );
};

export default DateRangePicker;
