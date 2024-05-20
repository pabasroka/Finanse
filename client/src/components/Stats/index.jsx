import styles from "./styles.module.css";
import Chart from "../Chart";
import DateRangePicker from "../DateRangePicker";
import React, { useState, useCallback, useEffect } from 'react';

const Stats = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/finances?start=${startDate}&end=${endDate}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [startDate, endDate]);

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, fetchData]);

	return (
		<div className={styles.main}>
      <DateRangePicker onChange={handleDateChange} />
			<Chart data={data} />
		</div>
	);
};

export default Stats;
