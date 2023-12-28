// App.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import StockRow from './components/StockRow';
import { iex } from './config/iex';
import Sidebar from './components/sidebar';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Historical from './components/Historical';
import CandlestickChart from './components/candleChart';
import IntradayChart from './components/intradayChart'; // Import the new IntradayChart component

const About = () => {
  return <div>About Page</div>; // Create the About component
};

const App = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [intradayData, setIntradayData] = useState([]); // New state for intraday data
  const [selectedStock, setSelectedStock] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [stockOptions, setStockOptions] = useState([]);
  const [filteredStockOptions, setFilteredStockOptions] = useState([]);
  const [selectedRange, setSelectedRange] = useState('2m'); // Default range is 2 months

  const handleInputChange = (event) => {
    const input = event.target.value;
    setSearchQuery(input);

    // Filter stock options based on search query
    const filteredOptions = stockOptions.filter(
      (option) =>
        option.symbol.toLowerCase().includes(input.toLowerCase()) ||
        option.name.toLowerCase().includes(input.toLowerCase())
    );

    setFilteredStockOptions(filteredOptions.slice(0, 10)); // Display top 10 filtered options
  };

  const onSelectStock = async (stock) => {
    setSelectedStock(stock);

    try {
      // Fetch historical data for the selected stock
      const historical = await axios.get(`${iex.base_url}data/core/historical_prices/${stock}?range=${selectedRange}&token=${iex.api_token}`);
      setHistoricalData(historical.data);

      // Fetch intraday data for the selected stock
      fetchIntradayData(stock);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRangeChange = (range) => {
    setSelectedRange(range);
    fetchData(selectedStock, range);
  };

  const fetchIntradayData = async (stock) => {
    try {
      // Fetch intraday data for the selected stock
      const intraday = await axios.get(`${iex.base_url}data/core/intraday_prices/${stock}?token=${iex.api_token}`);
      // console.log("intraaaaa",intraday);
      setIntradayData(intraday.data);
    } catch (error) {
      console.error('Error fetching intraday data:', error);
    }
  };

  const fetchData = async (stock, range) => {
    try {
      // Fetch historical data for the selected stock and range
      const historical = await axios.get(`${iex.base_url}data/core/historical_prices/${stock}?range=${range}&token=${iex.api_token}`);
      setHistoricalData(historical.data);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const symbols = await axios.get(`${iex.base_url}data/core/ref_data_iex_symbols?token=${iex.api_token}`);
        setStockOptions(symbols.data); // Update the stock options based on the fetched symbols data

        // Fetch historical data for the default stock and range
        const historical = await axios.get(`${iex.base_url}data/core/historical_prices/tsla?range=${selectedRange}&token=${iex.api_token}`);
        setHistoricalData(historical.data);

        // Fetch intraday data for the default stock
        fetchIntradayData('tsla');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedRange]);

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="container">
          <h1 className="mt-5">Stock Market Monitoring Dashboard</h1>
          <input type="text" placeholder='Search...' value={searchQuery} onChange={handleInputChange} />

          {/* Display search results */}
          <ul>
            {filteredStockOptions.map((option) => (
              <li key={option.symbol} onClick={() => onSelectStock(option.symbol)}>
                {option.symbol} - {option.name}
              </li>
            ))}
          </ul>

          <Routes>
            <Route path="/about" element={<About />} />
            {/* Add more routes as needed */}
          </Routes>

          <table className="table mt-3">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Price</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {/* Render selected stock */}
              {selectedStock && <StockRow ticker={selectedStock} />}
            </tbody>
          </table>

          {/* Render Candlestick Chart */}
          {selectedStock && <CandlestickChart data={historicalData} />}

          {/* Render Intraday Chart */}
          {selectedStock && <IntradayChart data={intradayData} />}

          {/* Range selection buttons */}
          <div className="mt-3">
            <button onClick={() => handleRangeChange('2m')}>2 Months</button>
            <button onClick={() => handleRangeChange('6m')}>6 Months</button>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
