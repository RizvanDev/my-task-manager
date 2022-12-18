import React, { useContext } from 'react'
import './dateContainer.scss'
import MyTitle from '../../../../Components/MyTitle/MyTitle'
import Time from './Time'
import { Context } from '../../../../context'

const DateContainer = () => {
  const { darkMode } = useContext(Context)

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