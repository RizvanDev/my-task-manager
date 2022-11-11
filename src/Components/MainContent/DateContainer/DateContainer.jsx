import React from 'react'
import './dateContainer.scss'
import MyTitle from '../../MyTitle/MyTitle'
import Time from './Time'

const DateContainer = ({ darkMode }) => {
  return (
    <div className={darkMode ? 'mainContent__time darkMode' : 'mainContent__time'}>
      <MyTitle fontSize='18px' lineHeight='25px' letterSpacing='0.02em'>
        Well well well !
      </MyTitle>
      <Time />
    </div>
  )
}

export default DateContainer
