import _ from 'lodash'

export function sortBy(items, sortColumn) {
  return _.orderBy(items, [sortColumn.path], [sortColumn.order])
}

export function toElipse(str, end = 20) {
  const x = str.substring(0, end)
  const hasElipse = str.length > end ? '...' : ''
  return `${x} ${hasElipse}`
}

export const formatDate = date => {
  return date ? new Date(date).toLocaleDateString() : null
}

export const createArray = (start, end) => {
  let arr = []
  for (let i = start; i <= end; i++) {
    arr.push(i)
  }
  return arr
}

export const mapToSelect = ({ id, name }) => {
  return { id, label: capitalize(name), value: name }
}

export const capitalize = str => _.startCase(str)
