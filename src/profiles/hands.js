import React from 'react'
import { useTable, useSortBy } from "react-table"
import './table.css'



export default function Table( { columns, data, props, number }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = useTable(
      {
        columns,
        data
      },
    );

    const firstPageRows = rows.slice(number, (number + 15))
    
    return (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column)}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map(
              row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td >{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
                )
              }
            )}
          </tbody>
        </table>
    );
  }