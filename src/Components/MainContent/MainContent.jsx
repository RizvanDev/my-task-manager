import React from 'react'
import './mainContent.scss'
import MainTop from './MainTop/Main.top'
import Tasks from './Tasks/Tasks'
import Time from './Time/Time'

const MainContent = ({ darkMode, setDarkMode, setTaskModal }) => {
  return (
    <div className='mainContent'>
      <MainTop darkMode={darkMode} setDarkMode={setDarkMode} setTaskModal={setTaskModal} />
      <main className='mainContent__main'>
        <Tasks />
        <Time darkMode={darkMode} />
      </main>
    </div>
  )
}

export default MainContent
