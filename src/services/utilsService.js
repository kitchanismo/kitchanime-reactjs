import _ from 'lodash'

export function sortBy(items, sortColumn) {
  return _.orderBy(items, [sortColumn.path], [sortColumn.order])
}

export function toElipse(str, end = 20) {
  const x = str.substring(0, end)
  const hasElipse = str.length > end ? '...' : ''
  return `${x} ${hasElipse}`
}

export const formatDate = date => new Date(date).toLocaleDateString()

export const createArray = (start, end) => {
  let arr = []
  for (let i = start; i <= end; i++) {
    arr.push(i)
  }
  return arr
}
