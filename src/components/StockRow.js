import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { iex } from '../config/iex';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const StockRow = (props) => {
  const [data, setData] = useState([""]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${iex.base_url}data/core/quote/${props.ticker}?token=${iex.api_token}`);
        setData(response.data);
        console.log("row dataaa",response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.ticker]);

  // Format market cap using toLocaleString
  const formattedMarketCap = data && data[0].marketCap && Number(data[0].marketCap).toLocaleString();

  return (
    <tr>
      <td>{props.ticker}</td>
      <td>{data&&data[0].companyName}</td>
      <td>{data && data[0].iexOpen}</td>
      <td>{data && data[0].iexClose}</td>
      <td>{formattedMarketCap}</td> {/* Display formatted market cap */}
    </tr>
  );
};

export default StockRow;
