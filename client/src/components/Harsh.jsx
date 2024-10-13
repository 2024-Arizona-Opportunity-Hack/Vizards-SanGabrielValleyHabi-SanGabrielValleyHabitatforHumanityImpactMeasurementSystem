import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Harsh() {
  const [sheetData, setSheetData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const sheetId = '1XcKfQcBAgM1KdFarF5gVTz-zS54Tf0iw9Rmu4LqbDO4';
      const apiKey = 'AIzaSyD-RTPxDj0oTnzzGcEKsoSlLC2_sSN0Jjk';
      const sheetName = 'Form responses 1';
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

      try {
        const response = await axios.get(url);
        setSheetData(response.data.values || []);
      } catch (error) {
        setError('Error fetching data. Please check permissions and try again.');
        console.error('Error details:', error);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Google Sheet Data</h2>
      {sheetData.length > 0 ? (
        <table>
          <tbody>
            {sheetData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}

export default Harsh;