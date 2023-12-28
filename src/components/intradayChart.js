// IntradayChart.js
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const IntradayChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Update chartData when data prop changes
  useEffect(() => {
    setIsLoading(true); // Set loading state to true when new data is received

    if (data && data.length) {
      const formattedData = data
        .filter((item) => item.high !== null && item.low !== null)
        .map((item) => ({
          x: new Date(item.date + ' ' + item.minute).getTime(),
          y: [item.open, item.high, item.low, item.close],
        }));
      setChartData(formattedData);
      setIsLoading(false); // Set loading state to false when data is processed
    }
  }, [data]);

  // Check if data is available
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!chartData.length) {
    return <div>No valid data available for Intraday Chart</div>;
  }

  const chartOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (val) {
          return new Date(val).toLocaleTimeString(); // Format the time on the x-axis
        },
      },
    },
    yaxis: {
      title: {
        text: 'Stock Price',
      },
    },
    title: {
      text: 'Intraday Price Chart',
      align: 'left',
    },
  };

  return <Chart options={chartOptions} series={[{ data: chartData }]} type="candlestick" height={350} />;
};

export default IntradayChart;
