import React, { useState } from 'react'
import './mainTop.scss'
import AddTaskBtn from '../../../UI/AddTaskBtn/AddTaskBtn'
import ModeBtn from '../../../UI/modeBtn/ModeBtn'
import UserMenu from '../../../UI/UserMenu/UserMenu'
import UserModal from '../../../UI/UserModal/UserModal'

const MainTop = ({ darkMode, setDarkMode }) => {
  const [userModal, setUserModal] = useState(false)

  return (
    <div className='mainContent__top'>
      <AddTaskBtn padding='10px 25px' color='#fafafa'>
        <svg width='20' height='20' fill='none'>
          <path
            d='M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z'
            stroke='#FAFAFA'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10 6.3999V13.5999'
            stroke='#FAFAFA'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M6.40002 10H13.6'
            stroke='#FAFAFA'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <span>New task</span>
      </AddTaskBtn>
      <ModeBtn darkMode={darkMode} />
      <UserMenu darkMode={darkMode} userModal={userModal} setUserModal={setUserModal} />
      <UserModal darkMode={darkMode} setDarkMode={setDarkMode} userModal={userModal} />
    </div>
  )
}

export default MainTop
