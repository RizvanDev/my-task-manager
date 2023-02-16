import { useContext } from 'react'
import Calendar from 'react-calendar'
import { Context } from '../../../../context'
import MyModal from '../../../../Components/UI/MyModal/MyModal'
import 'react-calendar/dist/Calendar.css'
import './calendar.scss'

const CalendarWindow = () => {
  const { darkMode, userInfo, modals, openModals, calendarDate, selectData } = useContext(Context)

  const calendarHandleClick = e => {
    return userInfo.uid
      ? selectData(e)
      : openModals({ ...modals, calendarModal: false, authModal: true })
  }

  return (
    <MyModal
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
