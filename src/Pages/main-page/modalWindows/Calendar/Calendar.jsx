import React, { useContext } from 'react'
import Calendar from 'react-calendar'
import { Context } from '../../../../context'
import MyModal from '../../../../Components/UI/MyModal/MyModal'
import 'react-calendar/dist/Calendar.css'
import './calendar.scss'

const CalendarWindow = () => {
  const {
    darkMode,
    authorization,
    calendarModal,
    setCalendarModal,
    setAuthModal,
    calendarDate,
    selectData,
  } = useContext(Context)

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

  const calendarHandleClick = e => {
    if (!authorization) {
      setCalendarModal(false)
      return setAuthModal(true)
    }

    return selectData(e)
  }

  return (
    <MyModal
      styles={modalStyles}
      darkMode={darkMode}
      opened={calendarModal}
      closeModal={() => setCalendarModal(false)}>
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
