import React from 'react'
import './App.scss'
import AsideBar from '../AsideBar/AsideBar'
import MainContent from '../MainContent/MainContent'
import TaskModal from '../../modalWindows/TaskModal/TaskModal'
import Authorization from '../../modalWindows/Authorization/Authorization'
import CalendarWindow from '../../modalWindows/Calendar/Calendar'
import { withApp } from '../../hoc/withApp'

const App = ({ darkMode }) => {
  return (
    <div className={darkMode ? 'App darkMode' : 'App'}>
      <div className='app__container'>
        <AsideBar darkMode={darkMode} />
        <MainContent />
        <TaskModal />
        <Authorization />
        <CalendarWindow />
      </div>
    </div>
  )
}

export default withApp(App)
