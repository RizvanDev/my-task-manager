import React from 'react'
import './mainContent.scss'
import MainTop from './components/MainTop/Main.top'
import Tasks from './components/Tasks/Tasks'
import Time from './components/Time/Time'

const MainContent = ({ darkMode, setDarkMode }) => {
  return (
    <div className='mainContent'>
      <MainTop darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className='mainContent__main'>
        <Tasks />
        <Time />
      </main>
    </div>
  )
}

export default MainContent
