import React, { useContext } from 'react'
import { Context } from '../../../../context'
import MyTitle from '../../../../Components/MyTitle/MyTitle'
import ListItem from '../ListItem/ListItem'
import './info.scss'

const Info = () => {
  const { authorization, modals, openModals } = useContext(Context)

  const handleClick = () => {
    return !authorization
      ? openModals({ ...modals, authModal: true })
      : openModals({ ...modals, statisticsModal: true })
  }

  const titleStyles = {
    fontSize: '24px',
    lineHeight: '33px',
    letterSpacing: '0.03em',
  }

  if (window.innerWidth <= 1400) {
    titleStyles.fontSize = '20px'
    titleStyles.lineHeight = '28px'
  }

  return (
    <div className='asideBar__info'>
      <MyTitle {...titleStyles}>My data</MyTitle>
      <ul className='info__list'>
        <ListItem onClick={handleClick}>
          <svg width='18px' height='18px' fill='none'>
            <path
              d='M13.5 15V7.5'
              stroke='#282846'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M9 15V3'
              stroke='#282846'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M4.5 15V10.5'
              stroke='#282846'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span>Statistics</span>
        </ListItem>
      </ul>
    </div>
  )
}

export default Info
