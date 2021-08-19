import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTable,Cell as cell,Column as column, Row as row } from 'react-table'
import { COLUMNS } from './columns'
import './table.css'
 

function Table({items}) {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => items, [items])


 const table = useTable({
        columns,
        data
    } )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table

    return (
        <React.Fragment>

        {
            items !== undefined ?
            <table {...getTableProps()}>
            <thead>

                {
                    headerGroups.map(headerGroups => (
                        <tr {...headerGroups.getHeaderGroupProps()}>
                            {
                                headerGroups.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))
                            }
                        </tr>
                    ))
                }
                
            </thead>
            
            <tbody {...getTableBodyProps()}>
              {
                  rows.map((row,i) => {
                      prepareRow(row)
                      return (<tr {...row.getRowProps()}>
                          {
                              row.cells.map(cell => {
                                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                              }) 
                          }
                      </tr>)
                  })
              }
            </tbody>
        </table>
            : null
        }
        </React.Fragment>

    )
}

export default Table
