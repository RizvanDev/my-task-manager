const getInitialChart = () => {
  return [
    { day: 'Sun', created: 0, completed: 0 },
    { day: 'Mon', created: 0, completed: 0 },
    { day: 'Tue', created: 0, completed: 0 },
    { day: 'Wed', created: 0, completed: 0 },
    { day: 'Thu', created: 0, completed: 0 },
    { day: 'Fri', created: 0, completed: 0 },
    { day: 'Sat', created: 0, completed: 0 },
  ]
}

// Helper function to format a date to a string without periods
const formatDate = date => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
  return date.toLocaleDateString(options).replaceAll('.', '')
}

// Helper function to reverse the order of day, month, and year in a string
const reverseDate = str => str.replace(/(\d{2})(\d{2})(\d{4})/, '$3$2$1')

// Getting week data from all tasks data
const getCurrentWeekData = tasksData => {
  const weeklyData = {}

  // Get the first day and last day of the current week
  const curDate = new Date()
  const curMonth = curDate.toLocaleDateString('en-US', { month: '2-digit' })

  const firstDayOptions = new Date(new Date().setDate(curDate.getDate() - curDate.getDay()))
  const lastDayOptions = new Date(new Date().setDate(curDate.getDate() - curDate.getDay() + 6))

  const firstDayOfWeek = formatDate(firstDayOptions)
  const lastDayOfWeek = formatDate(lastDayOptions)

  // Changing the order of the date periods for the first and last day of the week
  const reversedFirstDay = reverseDate(firstDayOfWeek)
  const reversedLastDay = reverseDate(lastDayOfWeek)

  for (const day in tasksData) {
    const month = day.substring(2, 4)

    if (month !== curMonth) continue

    const reversedDay = reverseDate(day)

    const isCurrentWeek = reversedDay >= reversedFirstDay && reversedDay <= reversedLastDay

    if (isCurrentWeek) {
      const date = new Date(day.replace(/(\d{2})(\d{2})(\d{4})/, '$2 $1 $3'))
      const dayOfWeekName = date.toLocaleDateString('en-US', { weekday: 'short' })
      weeklyData[dayOfWeekName] = tasksData[day]
    }
  }

  return weeklyData
}

// Create weekly completion data
const getWeeklyTasksCompletion = tasksData => {
  const weeklyTasks = getCurrentWeekData(tasksData)

  const weeklyChart = getInitialChart()

  // Loop through each day in the weekly data
  for (const day of Object.keys(weeklyTasks)) {
    for (const tab of weeklyTasks[day]) {
      if (tab.data) {
        for (const task of tab.data) {
          // Find the chart object that corresponds to the current day of the week
          const desiredDay = weeklyChart.find(dayOfWeek => dayOfWeek.day === day)
          // Increment the created count
          desiredDay.created++
          // If the task is completed, increment the completed count
          task.completed && desiredDay.completed++
        }
      }
    }
  }

  return weeklyChart
}

const CREATE_WEEKLY_COMPLETION_DATA = 'CREATE_WEEKLY_COMPLETION_DATA'
const SET_DEFAULT_STATE = 'SET_DEFAULT_STATE'

const chartReducer = (state = getInitialChart(), action) => {
  switch (action.type) {
    case CREATE_WEEKLY_COMPLETION_DATA:
      return getWeeklyTasksCompletion(action.tasksData)
    case SET_DEFAULT_STATE:
      return getInitialChart()
    default:
      return state
  }
}

const actions = {
  createWeeklyCompletionData: tasksData => ({ type: CREATE_WEEKLY_COMPLETION_DATA, tasksData }),
  setDefaultChart: () => ({ type: SET_DEFAULT_STATE }),
}

export { chartReducer, actions }
