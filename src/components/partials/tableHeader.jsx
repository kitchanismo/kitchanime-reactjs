import React, { PureComponent } from 'react'

// columns: array
// sortColumn: object
// onSort: function

const TableHeader = props => {
  const raiseSort = path => {
    const sortColumn = { ...props.sortColumn }
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc'
    else {
      sortColumn.path = path
      sortColumn.order = 'asc'
    }
    props.onSort(sortColumn)
  }

  const renderSortIcon = column => {
    const { sortColumn } = props

    if (!column.path) return null

    if (column.path !== sortColumn.path) return null

    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc" />
    return <i className="fa fa-sort-desc" />
  }

  return (
    <thead className="thead-dark">
      <tr>
        {props.columns.map((column, i) => (
          <th
            className="clickable"
            key={i}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
