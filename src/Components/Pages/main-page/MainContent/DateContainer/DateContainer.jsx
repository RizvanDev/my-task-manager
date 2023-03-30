import { useContext } from 'react'
import { Context } from '../../../../../context'
import MyTitle from '../../../../../Components/UI/MyTitle/MyTitle'
import Time from './Time'
import DateButton from './DateButton'
import './dateContainer.scss'

const DateContainer = () => {
  const {
    darkMode,
    calendarDate,
    modals,
    openModals,
    userInfo,
    setTabItems,
    setCategory,
    setTab,
    setCalendarDate,
  } = useContext(Context)

  const openCalendar = () => openModals({ ...modals, calendarModal: true })

  return (
    <div className={darkMode ? 'mainContent__time darkMode' : 'mainContent__time'}>
      <MyTitle fontSize='18px' lineHeight='25px' letterSpacing='0.02em'>
        Well well well !
      </MyTitle>
      <div className='time__container'>
        <Time
          userInfo={userInfo}
          setTabItems={setTabItems}
          setCategory={setCategory}
          setTab={setTab}
          setCalendarDate={setCalendarDate}
        />
        <DateButton calendarDate={calendarDate} openCalendar={openCalendar} />
      </div>
    </div>
  )
}

export default DateContainer
