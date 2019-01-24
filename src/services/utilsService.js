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
  const formatedDate = new Date(date).toLocaleDateString()

  return formatedDate === 'Invalid Date' ? 'N/A' : formatedDate
}

export const createArray = (start, end) => {
  let arr = []
  for (let i = start; i <= end; i++) {
    arr.push(i)
  }
  return arr
}
