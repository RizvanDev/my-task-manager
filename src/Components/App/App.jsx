import React, { useState } from 'react'
import './App.scss'
import AsideBar from '../AsideBar/AsideBar'
import MainContent from '../MainContent/MainContent'
import TaskModal from '../TaskModal/TaskModal'

const defaultListItems = ['Home', 'Family', 'Work', 'Sport']

const App = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [listItems, setListItem] = useState(defaultListItems)
  const [tab, setTab] = useState(defaultListItems[0])
  const [taskModal, setTaskModal] = useState(false)

  return (
    <div className={darkMode ? 'App darkMode' : 'App'}>
      <div className='app__container'>
        <AsideBar
          darkMode={darkMode}
          listItems={listItems}
          setListItem={setListItem}
          tab={tab}
          setTab={setTab}
        />
        <MainContent
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setTaskModal={setTaskModal}
          listItems={listItems}
          setListItem={setListItem}
          tab={tab}
          setTab={setTab}
        />
        <TaskModal
          darkMode={darkMode}
          taskModal={taskModal}
          setTaskModal={setTaskModal}
          listItems={listItems}
        />
      </div>
    </div>
  )
}

export default App
