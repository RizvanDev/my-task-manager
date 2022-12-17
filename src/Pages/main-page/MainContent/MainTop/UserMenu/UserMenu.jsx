import React from 'react'
import cl from './userMenu.module.scss'

const UserMenu = ({ darkMode, userModal, setUserModal, userInfo }) => {
  return (
    <button
      type='button'
      className={cl.userMenu__container}
      onClick={() => setUserModal(!userModal)}>
      <span
        className={
          darkMode ? [cl.userMenu__name, cl.darkModeText].join(' ') : cl.userMenu__name
        }>
        {userInfo.nick}
      </span>
      <img className={cl.userMenu__avatar} src={userInfo.photo} alt='avatar' />
      <div
        className={
          darkMode ? [cl.userMenu__icon, cl.darkModeBtn].join(' ') : cl.userMenu__icon
        }>
        <svg className={userModal ? cl.rotate : ''} width='14' height='8' fill='none'>
          <path
            d='M1 1L7 7L13 1'
            stroke='#29A19C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    </button>
  )
}

export default UserMenu
