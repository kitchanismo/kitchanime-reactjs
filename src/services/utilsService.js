import _ from 'lodash'

export function sortBy(items, sortColumn) {
  return _.orderBy(items, [sortColumn.path], [sortColumn.order])
}
