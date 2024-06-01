import styles from "./styles.module.css";
import DateRangePicker from "../DateRangePicker";
import React, { useState, useCallback, useEffect } from 'react';
import List from "../List";

const Reports = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState([]);
  const [type, setType] = useState(null);

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8080/api/finances?start=${startDate}&end=${endDate}&type=${type}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token
        },
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [startDate, endDate, type]);

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value.toLowerCase());
    console.log(event.target.value.toLowerCase())
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, type, fetchData]);

  return (
    <div className={styles.main}>
      <DateRangePicker onChange={handleDateChange} />
      <div>
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          name="type"
          value={type}
          onChange={handleTypeChange}
          required
        >
          <option value="null">All</option>
          <option value="income">Income</option>
          <option value="outcome">Outcome</option>
        </select>
      </div>
      <List data={data} />
    </div>
  );
};

export default Reports;
