const initialState = {
  date: new Date().toLocaleDateString().split('.').reverse().join(''),
  tabs: [],
}

const createTask = (state, taskValue, category) => {
  const newTask = {
    task: taskValue,
    time: new Date().toLocaleTimeString(),
    completed: false,
  }

  const updatedTabItems = state.tabs.map(tab => {
    return tab.title === category ? { ...tab, data: [...tab.data, newTask] } : tab
  })

  return { ...state, tabs: updatedTabItems }
}

const CREATE_TASK = 'CREATE_TASK'
const COMPLETE_TASK = 'COMPLETE_TASK'
const EDIT_TASK = 'EDIT_TASK'
const DELETE_TASK = 'DELETE_TASK'

const tabItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK:
      return createTask(state, action.taskValue, action.category)
    case COMPLETE_TASK:
      return
    case EDIT_TASK:
      return
    case DELETE_TASK:
      return
    default:
      return state
  }
}

const tabsActions = {
  createNewTask: (taskValue, category) => ({ type: CREATE_TASK, taskValue, category }),
}

export { tabItemsReducer, tabsActions }
