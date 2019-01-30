import React, { PureComponent } from 'react'

// columns: array
// sortColumn: object
// onSort: function

class TableHeader extends PureComponent {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn }
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc'
    else {
      sortColumn.path = path
      sortColumn.order = 'asc'
    }
    this.props.onSort(sortColumn)
  }

  renderSortIcon = column => {
    const { sortColumn } = this.props

    if (!column.path) return null

    if (column.path !== sortColumn.path) return null

    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc" />
    return <i className="fa fa-sort-desc" />
  }

  render() {
    return (
      <thead className="thead-dark">
        <tr>
          {this.props.columns.map((column, i) => (
            <th
              className="clickable"
              key={i}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    )
  }
}

export default TableHeader
