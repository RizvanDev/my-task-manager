import React, { useEffect, useState } from 'react'

const Time = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 999)
    return () => clearInterval(interval)
  }, [time])

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
          <span>{time.toLocaleTimeString()}</span>
        </div>
      </div>
      <div className='time__block'>
        <span className='time__helpTitle'>Today we have</span>
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
          <span>{time.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}

export default Time
