import React, { useEffect, useContext } from 'react'
import { database } from '../../../../firebase/firebaseConfig'
import { Context } from '../../../../context'
import useValue from '../../../../hooks/useValue'

const Time = () => {
  const [today, setToday] = useValue(new Date())
  const { darkMode, calendarDate, setCalendarModal, userInfo, defaultItems, setTabItem } =
    useContext(Context)

  useEffect(() => {
    const interval = setInterval(() => setToday(new Date()), 999)
    return () => clearInterval(interval)
  }, [today])

  if (today.toLocaleTimeString() === '00:00:00') {
    database.writeNewDayData(
      userInfo.uid,
      today.toLocaleDateString().split('.').join(''),
      defaultItems,
    )

    setTabItem(defaultItems)
    window.location.reload()
  }

  const selectText = () => {
    const selectedData = +calendarDate.toLocaleDateString().split('.').reverse().join('')
    const present = +new Date().toLocaleDateString().split('.').reverse().join('')

    return selectedData < present
      ? 'viewing old records...'
      : selectedData > present
      ? 'planning...'
      : 'Today we have'
  }

  return (
    <div className='time__container'>
      <div className='time__block'>
        <span className='time__helpTitle'>Now on the clock</span>
        <div className='time__block-data'>
          <svg width='24' height='24' fill='none'>
            <path
              d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
              stroke='#282846'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M12 6V12L16 14'
              stroke='#282846'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span>{today.toLocaleTimeString()}</span>
        </div>
      </div>
      <button
        type='button'
        className={
          darkMode ? 'time__block calendar-btn darkMode' : 'time__block calendar-btn'
        }
        onClick={() => setCalendarModal(true)}>
        <span className='time__helpTitle'>{selectText()}</span>
        <div className='time__block-data'>
          <svg width='24' height='24' fill='none'>
            <path
              d='M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z'
              stroke='#282846'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M16 2V6'
              stroke='#282846'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M8 2V6'
              stroke='#282846'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M3 10H21'
              stroke='#282846'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span>{calendarDate.toLocaleDateString()}</span>
        </div>
      </button>
    </div>
  )
}

export default Time
