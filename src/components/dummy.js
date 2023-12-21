// StockChart2.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const StockChart2 = ({ data }) => {
  if (!data || data.length === 0) {
    // Handle loading or empty data state
    return null;
  }

  return (
    <LineChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="priceDate" />
      <YAxis />
      <Tooltip />
      <Legend />
      {Object.keys(data[0]).map((key, index) => (
        key !== 'priceDate' && // Exclude 'priceDate' from lines
        <Line key={index} type="monotone" dataKey={key} stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
      ))}
    </LineChart>
  );
};

export default StockChart2;
