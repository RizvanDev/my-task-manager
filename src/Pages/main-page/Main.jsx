import React, { useContext } from 'react'
import { Context } from '../../context'
import MainContent from './MainContent/MainContent'
import TaskModal from './modalWindows/TaskModal/TaskModal'
import Authorization from './modalWindows/Authorization/Authorization'
import CalendarWindow from './modalWindows/Calendar/Calendar'
import InfoAuthModal from './modalWindows/InfoAuthModal/InfoAuthModal'
import Statistics from './modalWindows/Statistics/Statistics'

const Main = () => {
  const { authInfoModal, createAuthInfoModal } = useContext(Context)

  return (
    <div>
      <MainContent />
      <TaskModal />
      <Authorization />
      <CalendarWindow />
      <Statistics />
      {authInfoModal.show && (
        <InfoAuthModal
          authInfoModal={authInfoModal}
          createAuthInfoModal={createAuthInfoModal}
        />
      )}
    </div>
  )
}

export default Main
