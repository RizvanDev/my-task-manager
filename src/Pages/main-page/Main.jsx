import React from 'react'
import MainContent from './MainContent/MainContent'
import TaskModal from './modalWindows/TaskModal/TaskModal'
import Authorization from './modalWindows/Authorization/Authorization'
import CalendarWindow from './modalWindows/Calendar/Calendar'

const Main = () => {
  return (
    <div>
      <MainContent />
      <TaskModal />
      <Authorization />
      <CalendarWindow />
    </div>
  )
}

export default Main
