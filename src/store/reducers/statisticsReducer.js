const getInitialStatistics = () => ({ categories: 0, createdTasks: 0, completedTasks: 0 })
const date = new Date().toLocaleDateString().replaceAll('.', '')

// Helper function. Update statistics
const updateStatistics = (statistics, data) => {
  data.forEach(category => {
    if (category.hasOwnProperty('data')) {
      statistics.createdTasks += category.data.length
      statistics.completedTasks += category.data.filter(task => task.completed).length
    }
  })
}

// Day
const getStatisticsPerDay = tabItems => {
  const statistics = getInitialStatistics()

  statistics.categories = tabItems.tabs.length
  updateStatistics(statistics, tabItems.tabs)

  return statistics
}
// Month
const getStatisticsPerMonth = data => {
  const statistics = getInitialStatistics()

  const currentMonth = date.substring(2, 4)

  for (const day in data) {
    if (day.substring(2, 4) === currentMonth) {
      statistics.categories += data[day].length
      updateStatistics(statistics, data[day])
    }
  }

  return statistics
}
// Year
const getStatisticsPerYear = data => {
  const statistics = getInitialStatistics()

  const currentYear = date.substring(4)

  for (const day in data) {
    if (day.substring(4) === currentYear) {
      statistics.categories += data[day].length
      updateStatistics(statistics, data[day])
    }
  }

  return statistics
}

const CREATE_DAY_STATISTICS = 'CREATE_DAY_STATISTICS'
const CREATE_MONTH_STATISTICS = 'CREATE_MONTH_STATISTICS'
const CREATE_YEAR_STATISTICS = 'CREATE_YEAR_STATISTICS'

const statisticsReducer = (state = getInitialStatistics(), action) => {
  switch (action.type) {
    case CREATE_DAY_STATISTICS:
      return getStatisticsPerDay(action.tabItems)
    case CREATE_MONTH_STATISTICS:
      return getStatisticsPerMonth(action.data)
    case CREATE_YEAR_STATISTICS:
      return getStatisticsPerYear(action.data)
    default:
      return state
  }
}

const statisticsActions = {
  createDayStatistics: tabItems => ({ type: CREATE_DAY_STATISTICS, tabItems }),
  createMonthStatistics: data => ({ type: CREATE_MONTH_STATISTICS, data }),
  createYearStatistics: data => ({ type: CREATE_YEAR_STATISTICS, data }),
}

export { statisticsReducer, statisticsActions }
