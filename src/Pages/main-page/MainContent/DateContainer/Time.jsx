import React, { useEffect } from 'react'
import { database } from '../../../../firebase/firebaseConfig'
import useValue from '../../../../hooks/useValue'

const Time = ({ userInfo, defaultItems, setTabItem, setCategory, setTab }) => {
  const [today, setToday] = useValue(new Date())

  useEffect(() => {
    const interval = setInterval(() => setToday(new Date()), 999)
    return () => clearInterval(interval)
  }, [today])

  if (today.toLocaleTimeString() === '00:00:00') {
    database.writeNewDayData(
      userInfo.uid,
      today.toLocaleDateString().split('.').join(''),
      defaultItems,
      setTabItem,
      setCategory,
      setTab,
    )
    window.location.reload()
  }

  return (
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
  )
}

export default Time
