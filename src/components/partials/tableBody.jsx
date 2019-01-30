import React from 'react'
import _ from 'lodash'

const TableBody = ({ data, columns }) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item)

    return _.get(item, column.path)
  }

  return (
    <tbody>
      {data.map(item => (
        <tr key={item.id}>
          {columns.map((column, i) => (
            <td key={i}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody
