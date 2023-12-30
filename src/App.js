// App.js
// Import necessary dependencies at the beginning of your file
import React, { useState ,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import LoginPage from './components/LoginPage';
import StockRow from './components/StockRow';
import { iex } from './config/iex';
import axios from 'axios';
import Historical from './components/Historical';
import CandlestickChart from './components/candleChart';
import IntradayChart from './components/intradayChart';
import { CircularProgress, Button } from '@mui/material';
import Select from 'react-select';
import { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import SectorPerformanceChart from './components/sector';
import './App.css'


const About = () => {
  return <div>About Page</div>;
};
const PrivateRoute = ({ element, ...rest }) => {
  const isLoggedIn = ''
  return isLoggedIn ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
};


const App = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [intradayData, setIntradayData] = useState([]);
  const [selectedStock, setSelectedStock] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [stockOptions, setStockOptions] = useState([]);
  const [filteredStockOptions, setFilteredStockOptions] = useState([]);
  const [selectedRange, setSelectedRange] = useState('2m');
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);

    const filteredOptions = stockOptions.filter(
      (option) =>
        option.symbol.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredStockOptions(filteredOptions);
  };

  const onSelectStock = async (selectedOption) => {
    setSelectedStock(selectedOption.value);

    try {
      const historical = await axios.get(
        `${iex.base_url}data/core/historical_prices/${selectedOption.value}?range=${selectedRange}&token=${iex.api_token}`
      );
      setHistoricalData(historical.data);

      fetchIntradayData(selectedOption.value);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRangeChange = (range) => {
    setSelectedRange(range);
    fetchData(selectedStock, range);
  };

  const handleSearchBarFocus = () => {
    setSearchQuery('');
  };

  const loadOptions = async (inputValue, callback) => {
    try {
      const response = await axios.get(
        `${iex.base_url}search/${inputValue}?token=${iex.api_token}`
      );

      const options = response.data.map((option) => ({
        value: option.symbol,
        label: `${option.symbol} - ${option.name}`,
      }));

      callback(options);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const fetchIntradayData = async (stock) => {
    try {
      const intraday = await axios.get(
        `${iex.base_url}data/core/intraday_prices/${stock}?token=${iex.api_token}`
      );
      setIntradayData(intraday.data);
    } catch (error) {
      console.error('Error fetching intraday data:', error);
    }
  };

  const fetchData = async (stock, range) => {
    try {
      const historical = await axios.get(
        `${iex.base_url}data/core/historical_prices/${stock}?range=${range}&token=${iex.api_token}`
      );
      setHistoricalData(historical.data);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const symbols = await axios.get(
          `${iex.base_url}data/core/ref_data_iex_symbols?token=${iex.api_token}`
        );
        setStockOptions(symbols.data);

        const defaultStock = 'aapl';
        const historical = await axios.get(
          `${iex.base_url}data/core/historical_prices/${defaultStock}?range=${selectedRange}&token=${iex.api_token}`
        );
        setHistoricalData(historical.data);

        fetchIntradayData(defaultStock);

        setSelectedStock(defaultStock);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedRange]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '100%',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      border: '1px solid #ddd',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#f0f8ff' : 'white',
      color: state.isFocused ? '#007bff' : '#495057',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12Z"
              fill="#007bff"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10Z"
              fill="#007bff"
            />
          </svg>
        </components.DropdownIndicator>
      )
    );
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <>
            <Sidebar />
            <div className="container">
              <h1 className="mt-5 heading">Stock Market Monitoring Dashboard</h1>
              <h3 style={{marginLeft:150}}>Enter The Stock Below To Search </h3>
              <AsyncSelect
                cacheOptions
                defaultOptions
                value={{ value: selectedStock, label: selectedStock }}
                loadOptions={loadOptions}
                isSearchable
                onChange={onSelectStock}
                onInputChange={handleInputChange}
                styles={customStyles}
                components={{ DropdownIndicator }}
              />

              <Routes>
                <Route path="/about" element={<About />} />
                {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
              </Routes>

              <div className="dashboard-container" style={{marginTop:15}}>
                <div className="stock-details">
                  <div className="table-card">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Ticker</th>
                          <th>Company Name</th>
                          <th>Opening Price</th>
                          <th>Closing Price</th>
                          <th>Market Cap</th>
                        </tr>
                      </thead>
                      <tbody>{selectedStock && <StockRow ticker={selectedStock} />}</tbody>
                    </table>
                  </div>
                </div>
                <div
                  className="sector-performance-container"
                  style={{ position: 'absolute', top: 200, right: 200, width: 500, height: 500 }}
                >
                  <div>
                    <SectorPerformanceChart />
                  </div>
                </div>

                <div className="charts">
                  <div className="chart-card">
                    <h2 style={{ marginLeft: 250 }}>Historical Chart</h2>
                    {selectedStock ? (
                      <CandlestickChart data={historicalData} />
                    ) : (
                      <CircularProgress />
                    )}
                    <div className="mt-3" style={{ marginLeft: 250 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleRangeChange('2m')}
                      >
                        2 Months
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleRangeChange('6m')}
                      >
                        6 Months
                      </Button>
                    </div>
                  </div>

                  <div className="chart-card" style={{ marginTop:5 }}>
                    <h2 style={{ marginLeft: 250 }}>IntraDay Chart</h2>
                    {selectedStock ? (
                      <IntradayChart data={intradayData} />
                    ) : (
                      <CircularProgress />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} onLogout={handleLogout} />}
            />
            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;