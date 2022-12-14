import React, { useContext } from 'react'
import { Context } from '../../../../context'
import MyTitle from '../../../../Components/MyTitle/MyTitle'
import Time from './Time'
import DateButton from './DateButton'
import './dateContainer.scss'

const DateContainer = () => {
  const {
    darkMode,
    calendarDate,
    setCalendarModal,
    userInfo,
    setTabItem,
    setCategory,
    setTab,
    setCalendarDate,
  } = useContext(Context)

  return (
    <div className={darkMode ? 'mainContent__time darkMode' : 'mainContent__time'}>
      <MyTitle fontSize='18px' lineHeight='25px' letterSpacing='0.02em'>
        Well well well !
      </MyTitle>
      <div className='time__container'>
        <Time
          userInfo={userInfo}
          setTabItem={setTabItem}
          setCategory={setCategory}
          setTab={setTab}
          setCalendarDate={setCalendarDate}
        />
        <DateButton calendarDate={calendarDate} setCalendarModal={setCalendarModal} />
      </div>
    </div>
  )
}

export default DateContainer
