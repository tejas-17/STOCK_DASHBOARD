import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { iex } from '../config/iex';

const StockRow = (props) => {
  const [data,setData]=useState([""]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${iex.base_url}data/core/quote/${props.ticker}?token=${iex.api_token}`);
        

        console.log("response data",response.data[0].latestPrice);
       
         setData(response.data)
         console.log("datttaaa",data[0].latestPrice);
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.ticker]);
  

  return (
    <tr>
      <td>{props.ticker}</td>
      <td>{data[0].latestPrice}</td>
       <td>{ data[0].latestTime}</td>
      
    </tr>
  );
};

export default StockRow;
