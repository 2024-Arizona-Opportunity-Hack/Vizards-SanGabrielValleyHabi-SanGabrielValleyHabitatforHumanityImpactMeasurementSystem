import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

function VolunteerHoursPieChart() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetId = '1i6ZF2sleWPuZp7veKNiuQnQQ59Q7xqLFjiegvyTgzyM';
        const gid = '0';
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
        
        console.log('Fetching data from:', url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.text();
        console.log('Raw data:', data);
        const parsedData = parseCSV(data);
        console.log('Parsed data:', parsedData);
        
        const cD = [
          ['Volunteer Activity', 'Total Hours'],
          ...parsedData.slice(1).reduce((acc, row) => {
            const activity = row[0];
            const hours = row[1];
            if (!isNaN(hours)) {
              const existingIndex = acc.findIndex(item => item[0] === activity);
              if (existingIndex > -1) {
                acc[existingIndex][1] += hours;
              } else {
                acc.push([activity, hours]);
              }
            }
            return acc;
          }, [])
        ];
        setChartData(cD);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseCSV = (csvData) => {
    const rows = csvData.split('\n');
    console.log('Rows:', rows);
    
    // Parse header
    const header = rows[0].split(',').map(item => item.trim());
    
    // Parse data rows
    const dataRows = rows.slice(1).map(row => {
      const columns = row.split(',');
      if (columns.length >= 6) {
        return [columns[4].trim(), parseFloat(columns[5].trim())];
      }
      return null;
    }).filter(row => row !== null);

    return [header, ...dataRows];
  };

  if (isLoading) {
    return <div>Loading volunteer hours data...</div>;
  }

  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  console.log('Final chart data:', chartData);

  return (
    <Chart
      chartType="PieChart"
      data={chartData}
      options={{
        title: 'Distribution of Volunteer Hours by Activity',
        is3D: true,
        sliceVisibilityThreshold: 0.01, // Hide slices smaller than 1%
        legend: { position: 'right' },
        tooltip: { showColorCode: true },
        chartArea: { width: '80%', height: '80%' },
      }}
      width="100%"
      height="400px"
    />
  );
}

export default VolunteerHoursPieChart;