// SectorPerformanceChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { Card, CardContent, Typography } from '@mui/material';

const SectorPerformanceChart = () => {
  const [sectorData, setSectorData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.iex.cloud/v1/data/CORE/SECTOR_PERFORMANCE/market?token=pk_cbe73806cd12468f9f63f14e9a323257'
        );
        setSectorData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sector performance data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: sectorData.map((sector) => sector.name),
      labels: {
        formatter: function (val) {
          return val.toFixed(4); // Format the performance value as needed
        },
      },
    },
  };

  const chartSeries = [
    {
      name: 'Performance',
      data: sectorData.map((sector) => sector.performance),
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Sector Wise Performance Of Market
        </Typography>
        {loading ? (
          <p>Loading sector performance data...</p>
        ) : (
          <Chart options={chartOptions} series={chartSeries} type="bar" height={550} width={420} />
        )}
      </CardContent>
    </Card>
  );
};

export default SectorPerformanceChart;
