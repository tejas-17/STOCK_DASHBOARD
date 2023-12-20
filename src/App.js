import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StockRow from './components/StockRow';



 function App(){
  return(
    <div className="App">
      <div className='container'>
        <table className='table mt-5'>
          <thead>
            <tr>
              <th>ticker</th>
              <th>price</th>
              <th>date</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            <StockRow ticker="aapl"/>
            <StockRow ticker="goog"/>
            <StockRow ticker="msft"/>
            <StockRow ticker="tsla"/>

          </tbody>
        </table>
      </div>
    </div>
  )
 }

 export default App;