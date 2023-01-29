import React, { useContext } from 'react'
import Calendar from 'react-calendar'
import { Context } from '../../../../context'
import MyModal from '../../../../Components/UI/MyModal/MyModal'
import 'react-calendar/dist/Calendar.css'
import './calendar.scss'

const CalendarWindow = () => {
  const { darkMode, authorization, modals, openModals, calendarDate, selectData } =
    useContext(Context)

  const modalStyles = {
    modal: {
      backgroundColor: '#0007',
      transition: 'all .0.2s ease 0s',
    },
    modalContainer: {
      maxWidth: '700px',
      padding: '20px',
      borderRadius: '10px',
      transition: 'all 0.5s ease 0.1s',
    },
  }

  if (window.innerWidth <= 767) {
    modalStyles.modalContainer.maxWidth = '330px'
    modalStyles.modalContainer.padding = '15px'
    modalStyles.modalContainer.borderRadius = '8px'
  }

  if (window.innerWidth <= 414) {
    modalStyles.modalContainer.maxWidth = '290px'
    modalStyles.modalContainer.padding = '10px'
  }

  const calendarHandleClick = e => {
    !authorization && openModals({ ...modals, calendarModal: false, authModal: true })

    return selectData(e)
  }

  return (
    <MyModal
      styles={modalStyles}
      darkMode={darkMode}
      opened={modals.calendarModal}
      closeModal={() => openModals({ ...modals, calendarModal: false })}>
      <Calendar
        className={darkMode ? 'calendar darkMode' : 'calendar'}
        value={calendarDate}
        onClickDay={calendarHandleClick}
        locale={'en'}
        prev2Label={null}
        next2Label={null}
        minDetail={'year'}
      />
    </MyModal>
  )
}

export default CalendarWindow
