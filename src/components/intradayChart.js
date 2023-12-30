// IntradayChart.js
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const IntradayChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (data && data.length) {
      const formattedData = data
        .filter((item) => item.high !== null && item.low !== null)
        .map((item) => ({
          x: new Date(item.date + ' ' + item.minute).getTime(),
          y: [item.open, item.high, item.low, item.close],
          closingPrice: item.close, // Add closing price to the data
        }));
      setChartData(formattedData);
      setIsLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!chartData.length) {
    return <div>No valid data available for Intraday Chart</div>;
  }

  const chartOptions = {
    chart: {
      type: 'line', // Change to 'line' for the line series
      height: 500,
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (val) {
          return new Date(val).toLocaleTimeString();
        },
      },
    },
    yaxis: [
      {
        title: {
          text: 'Stock Price',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Closing Price',
        },
      },
    ],
    title: {
      text: 'Intraday Price Chart',
      align: 'left',
    },
  };

  return (
    <Chart
      options={chartOptions}
      series={[
        { data: chartData, type: 'candlestick' }, // Candlestick series
        { data: chartData.map((item) => ({ x: item.x, y: item.closingPrice })), name: 'Closing Price', type: 'line' }, // Line series for closing prices
      ]}
      type="candlestick"
      height={800}
    />
  );
};

export default IntradayChart;
