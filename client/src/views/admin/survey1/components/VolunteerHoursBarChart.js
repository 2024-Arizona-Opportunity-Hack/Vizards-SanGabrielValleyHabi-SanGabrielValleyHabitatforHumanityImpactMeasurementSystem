import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

function VolunteerHoursBarChart() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetId = '1i6ZF2sleWPuZp7veKNiuQnQQ59Q7xqLFjiegvyTgzyM';
        const gid = '0';
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.text();
        const parsedData = parseCSV(data);
        
        const aggregatedData = aggregateData(parsedData);
        const topActivities = getTopActivities(aggregatedData, 10);
        
        setChartData([
          ['Volunteer Activity', 'Total Hours', { role: 'style' }],
          ...topActivities.map((activity, index) => [
            activity[0],
            activity[1],
            getBarColor(index)
          ])
        ]);
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
    return rows.slice(1).map(row => {
      const columns = row.split(',');
      if (columns.length >= 6) {
        return [columns[4].trim(), parseFloat(columns[5].trim())];
      }
      return null;
    }).filter(row => row !== null);
  };

  const aggregateData = (data) => {
    return data.reduce((acc, [activity, hours]) => {
      acc[activity] = (acc[activity] || 0) + hours;
      return acc;
    }, {});
  };

  const getTopActivities = (data, count) => {
    return Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count);
  };

  const getBarColor = (index) => {
    const colors = ['#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#0099c6', '#dd4477', '#66aa00', '#b82e2e', '#316395'];
    return colors[index % colors.length];
  };

  if (isLoading) {
    return <div>Loading volunteer hours data...</div>;
  }

  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={chartData}
      options={{
        title: 'Top 10 Volunteer Activities by Total Hours',
        subtitle: 'Based on cumulative hours contributed',
        bars: 'horizontal',
        legend: { position: 'none' },
        axisTitles: { y: 'Volunteer Activity', x: 'Total Hours' },
        hAxis: {
          title: 'Total Hours',
          minValue: 0,
        },
        vAxis: {
          title: 'Volunteer Activity',
        },
        chartArea: { width: '60%', height: '70%' },
      }}
    />
  );
}

export default VolunteerHoursBarChart