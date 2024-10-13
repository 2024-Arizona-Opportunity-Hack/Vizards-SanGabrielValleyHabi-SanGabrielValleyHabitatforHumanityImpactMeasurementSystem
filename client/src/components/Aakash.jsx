// import React, { useState, useEffect } from 'react';
// import { useTable } from 'react-table';
// // Correct for v5
// // import Button from '@mui/material/Button';``

// // // Incorrect (old v4 style)
// // import { Button } from '@mui/material';

// const Aakash = () => {
//   const [data, setData] = useState([]);
//   const [columns, setColumns] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const sheetId = '1ceDwJ2rTLsuuKx9JleHpP6c96W4nPS5aGc5lytAOBqo'; // Add your Google Sheet ID here
//     const apiKey = 'AIzaSyDoj9PJ_CdeWk__NgC4nVH516VH0KRC0fY'; // Add your API key here
//     const sheetName = 'Sheet1'; // Add your sheet name here
//     const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

//     try {
//       const response = await fetch(url);
//       const result = await response.json();
      
//       if (result.values && result.values.length > 0) {
//         const headers = result.values[0];
//         const tableData = result.values.slice(1);

//         setColumns(headers.map(header => ({
//           Header: header,
//           accessor: header.toLowerCase().replace(/ /g, '_')
//         })));

//         setData(tableData.map(row => {
//           const rowData = {};
//           headers.forEach((header, index) => {
//             rowData[header.toLowerCase().replace(/ /g, '_')] = row[index];
//           });
//           return rowData;
//         }));
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow
//   } = useTable({ columns, data });

//   return (
//     <div style={{ height: '400px', overflow: 'auto' }}>
//       <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%' }}>
//         <thead style={{ position: 'sticky', top: 0, background: 'white' }}>
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 <th {...column.getHeaderProps()} style={{ border: '1px solid black', padding: '8px' }}>
//                   {column.render('Header')}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map(row => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => (
//                   <td {...cell.getCellProps()} style={{ border: '1px solid black', padding: '8px' }}>
//                     {cell.render('Cell')}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Aakash;

import React, { useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';

const Aakash = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const sheetId = '1ceDwJ2rTLsuuKx9JleHpP6c96W4nPS5aGc5lytAOBqo';
    const apiKey = 'AIzaSyDoj9PJ_CdeWk__NgC4nVH516VH0KRC0fY';
    const sheetName = 'Sheet1';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.values && result.values.length > 0) {
        const headers = result.values[0];
        const tableData = result.values.slice(1);

        setColumns(headers.map(header => ({
          Header: header,
          accessor: header.toLowerCase().replace(/ /g, '_'),
          sortType: (rowA, rowB, columnId) => {
            const a = rowA.values[columnId];
            const b = rowB.values[columnId];
            if (isNaN(a) || isNaN(b)) {
              return a.localeCompare(b);
            }
            return parseFloat(a) - parseFloat(b);
          }
        })));

        setData(tableData.map(row => {
          const rowData = {};
          headers.forEach((header, index) => {
            rowData[header.toLowerCase().replace(/ /g, '_')] = row[index];
          });
          return rowData;
        }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    { 
      columns, 
      data,
      initialState: { sortBy: [{ id: columns[0]?.accessor, desc: false }] }
    }, 
    useSortBy
  );

  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ position: 'sticky', top: 0, background: 'white' }}>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ border: '1px solid black', padding: '8px' }}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} style={{ border: '1px solid black', padding: '8px' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Aakash;