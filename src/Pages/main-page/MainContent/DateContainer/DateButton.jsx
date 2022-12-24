import React from 'react'

const DateButton = ({ calendarDate, setCalendarModal }) => {
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
    <button
      type='button'
      className='time__block calendar-btn'
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
  )
}

export default DateButton
