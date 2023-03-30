const initialState = null

// Helper function. Getting week data from payload
const getWeekData = payload => {
  const weekData = {}

  // Helper formate date function
  const formateDate = date => {
    return date
      .toLocaleDateString({ day: '2-digit', month: '2-digit', year: 'numeric' })
      .replaceAll('.', '')
  }
  // Helper reverse str function
  const reverseDate = str => str.replace(/(\d{2})(\d{2})(\d{4})/, '$3$2$1')

  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleDateString().substring(3, 5)

  const firstDayOfWeek = formateDate(
    new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())),
  )

  const lastDayOfWeek = formateDate(
    new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6)),
  )

  for (const day in payload) {
    if (day.substring(2, 4) !== currentMonth) continue

    const reversedDay = reverseDate(day)
    const reversedFirstDay = reverseDate(firstDayOfWeek)
    const reversedLastDay = reverseDate(lastDayOfWeek)

    const weekCondition = reversedDay >= reversedFirstDay && reversedDay <= reversedLastDay

    if (weekCondition) {
      const date = new Date(day.replace(/(\d{2})(\d{2})(\d{4})/, '$2 $1 $3'))
      const dayOfWeekName = date.toLocaleDateString('en-US', { weekday: 'short' })
      weekData[dayOfWeekName] = payload[day]
    }
  }

  return weekData
}

const getWeeklyTaskCompletion = payload => {
  const week = getWeekData(payload)

  const defaultChart = [
    { day: 'Sun', created: 0, completed: 0 },
    { day: 'Mon', created: 0, completed: 0 },
    { day: 'Tue', created: 0, completed: 0 },
    { day: 'Wed', created: 0, completed: 0 },
    { day: 'Thu', created: 0, completed: 0 },
    { day: 'Fri', created: 0, completed: 0 },
    { day: 'Sat', created: 0, completed: 0 },
  ]

  for (const day of Object.keys(week)) {
    for (const tab of week[day]) {
      if (tab.data) {
        for (const task of tab.data) {
          const desiredObj = defaultChart.findIndex(obj => obj.day === day)
          defaultChart[desiredObj].created++
          task.completed && desiredObj !== -1 && defaultChart[desiredObj].completed++
        }
      }
    }
  }

  return [...defaultChart]
}

const getDefaultChart = () => {
  const defaultChart = [
    { day: 'Sun', created: 0, completed: 0 },
    { day: 'Mon', created: 0, completed: 0 },
    { day: 'Tue', created: 0, completed: 0 },
    { day: 'Wed', created: 0, completed: 0 },
    { day: 'Thu', created: 0, completed: 0 },
    { day: 'Fri', created: 0, completed: 0 },
    { day: 'Sat', created: 0, completed: 0 },
  ]

  return [...defaultChart]
}

const CREATE_WEEKLY_COMPLETION_DATA = 'CREATE_WEEKLY_COMPLETION_DATA'
const SET_DEFAULT_STATE = 'SET_DEFAULT_STATE'

export const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_WEEKLY_COMPLETION_DATA:
      return getWeeklyTaskCompletion(action.payload)
    case SET_DEFAULT_STATE:
      return getDefaultChart()
    default:
      return state
  }
}

export const createWeeklyCompletionData = payload => {
  return { type: CREATE_WEEKLY_COMPLETION_DATA, payload }
}

export const setDefaultChart = () => ({ type: SET_DEFAULT_STATE })
