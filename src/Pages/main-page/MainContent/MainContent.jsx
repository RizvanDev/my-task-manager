import React from 'react'
import './mainContent.scss'
import MainTop from './MainTop/Main.top'
import Tasks from './Tasks/Tasks'
import DateContainer from './DateContainer/DateContainer'

const MainContent = () => {
  return (
    <div className='mainContent'>
      <MainTop />
      <main className='mainContent__main'>
        <Tasks />
        <DateContainer />
      </main>
    </div>
  )
}

export default MainContent
