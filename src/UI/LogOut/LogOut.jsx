import React from 'react'
import cl from './logout.module.scss'

const LogOut = () => {
  return (
    <a href='#' className={cl.logOut}>
      <svg fill='none'>
        <path
          d='M11.25 2.25H14.25C14.6478 2.25 15.0294 2.40804 15.3107 2.68934C15.592 2.97064 15.75 3.35218 15.75 3.75V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H11.25'
          stroke='#282846'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7.5 12.75L11.25 9L7.5 5.25'
          stroke='#282846'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M11.25 9H2.25'
          stroke='#282846'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <span>Exit</span>
    </a>
  )
}

export default LogOut
