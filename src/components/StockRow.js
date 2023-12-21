import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { iex } from '../config/iex';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';


const StockRow = (props) => {
  const [data,setData]=useState([""]);
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${iex.base_url}data/core/quote/${props.ticker}?token=${iex.api_token}`);

        

        console.log("response data",response.data);
       
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
      <td>{data && data[0].latestPrice}</td>
       <td>{ data && data[0].latestTime}</td>
       <td>
        <LineChart width={100} height={40} data={data}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </td>
      <td>
        <LineChart width={100} height={40} data={data}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </td>
    </tr>
  );
};

export default StockRow;
