import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Chart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const chartInstance = echarts.init(chartRef.current);

      const categories = data.map(finance => finance.category);
      const values = data.map(finance => finance.value);

      const option = {
        title: {
          text: 'Finance Categories',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: 'Finance Categories',
            type: 'pie',
            radius: '50%',
            data: categories.map((category, index) => ({
              value: values[index],
              name: category,
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };

      chartInstance.setOption(option);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [data]);

  return <div ref={chartRef} style={{ width: '600px', height: '400px' }} />;
};

export default Chart;
