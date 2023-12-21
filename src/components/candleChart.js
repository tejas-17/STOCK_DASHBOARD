import React from 'react';
import Chart from 'react-apexcharts';

const CandlestickChart = ({ data }) => {
  // Check if data is available
  if (!data || !data.length) {
    return <div>No data available for Candlestick Chart</div>;
  }

  // Convert data to series format
  const chartSeries = [
    {
      data: data.map((item) => ({
        x: new Date(item.priceDate).getTime(),
        y: [item.uopen, item.uhigh, item.ulow, item.uclose],
      })),
    },
  ];

  const chartOptions = {
    chart: {
      type: 'candlestick',
    },
    title: {
      text: 'Candlestick Chart',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Chart options={chartOptions} series={chartSeries} type="candlestick" height={350} />;
};

export default CandlestickChart;
