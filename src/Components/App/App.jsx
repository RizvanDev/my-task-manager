import React, { useState } from 'react'
import './App.scss'
import AsideBar from '../AsideBar/AsideBar'
import MainContent from '../MainContent/MainContent'
import TaskModal from '../TaskModal/TaskModal'

const defaultItems = [
  { title: 'Home', data: [] },
  { title: 'Work', data: [] },
  { title: 'Sport', data: [] },
]

const App = () => {
  // state
  const [darkMode, setDarkMode] = useState(false)
  const [tabItems, setTabItem] = useState(defaultItems)
  const [tab, setTab] = useState(defaultItems[0].title)
  const [taskModal, setTaskModal] = useState(false)

  // create task
  const createTask = (task, setTask) => {
    setTask({ input: '', select: '' })
    setTaskModal(false)
    setTab(task.select)

    tabItems.forEach(tab => {
      if (tab.title === task.select) {
        tab.data = [...tab.data, { task: task.input, date: new Date(), completed: false }]
      }
    })

    return setTabItem([...tabItems])
  }

  //  delete task
  const deleteTask = (title, currentTask) => {
    tabItems.forEach(tab => {
      if (title === tab.title) {
        tab.data = tab.data.filter(task => task.task !== currentTask.task)
      }
    })

    return setTabItem([...tabItems])
  }

  // checked task
  const checkTask = (title, currentTask, complete) => {
    tabItems.forEach(tab => {
      if (title === tab.title) {
        tab.data.forEach(task => {
          if (currentTask.task === task.task) task.completed = !complete
        })
      }
    })

    return setTabItem(tabItems => [...tabItems])
  }

  // edit task
  const editTask = (event, title, currentTask, newValue) => {
    event.target.style.borderBottom = `1px solid ${event.target.value ? 'transparent' : 'red'}`
    event.target.readOnly = event.code === 'Enter' && event.target.value

    tabItems.forEach(tab => {
      if (title === tab.title) {
        tab.data.forEach(task => {
          if (currentTask.task === task.task) task.task = newValue
        })
      }
    })

    return setTabItem(tabItems => [...tabItems])
  }

  return (
    <div className={darkMode ? 'App darkMode' : 'App'}>
      <div className='app__container'>
        <AsideBar
          darkMode={darkMode}
          tabItems={tabItems}
          setTabItem={setTabItem}
          tab={tab}
          setTab={setTab}
        />
        <MainContent
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setTaskModal={setTaskModal}
          tabItems={tabItems}
          setTabItem={setTabItem}
          deleteTask={deleteTask}
          checkTask={checkTask}
          editTask={editTask}
          tab={tab}
          setTab={setTab}
        />
        <TaskModal
          darkMode={darkMode}
          taskModal={taskModal}
          setTaskModal={setTaskModal}
          tabItems={tabItems}
          createTask={createTask}
        />
      </div>
    </div>
  )
}

export default App
