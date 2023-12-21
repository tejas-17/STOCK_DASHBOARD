// App.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import StockRow from './components/StockRow';
import CandlestickChart from './components/apexchart';
import { iex } from './config/iex';
import Sidebar from './components/sidebar';
import axios from 'axios';
import FreeSolo from './components/search';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const About = () => {
  return <div>About Page</div>; // Create the About component
};

const App = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [selectedStock, setSelectedStock] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historical = await axios.get(`${iex.base_url}data/core/historical_prices/tsla?range=2m&token=${iex.api_token}`);
        setHistoricalData(historical.data);
        console.log("historical data", historical.data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchData();
  }, []);

  const onSelectStock = (stock) => {
    setSelectedStock(stock);
    // You can perform any additional actions when a stock is selected
  };

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="container">
          <h1 className="mt-5">Stock Market Monitoring Dashboard</h1>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/historical" element={<CandlestickChart data={historicalData} />} />
            {/* Add more routes as needed */}
          </Routes>
          <FreeSolo onChange={onSelectStock} />
          {/* Render CandlestickChart component here */}
          {selectedStock && (
            <CandlestickChart
              data={historicalData.find((stock) => stock.ticker === selectedStock) || {}}
            />
          )}
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Price</th>
                <th>Time</th>
                <th>Chart</th>
              </tr>
            </thead>
            <tbody>
              <StockRow ticker="aapl" />
              <StockRow ticker="goog" />
              <StockRow ticker="msft" />
              <StockRow ticker="tsla" />
            </tbody>
          </table>
        </div>
      </div>
    </Router>
  );
};

export default App;
