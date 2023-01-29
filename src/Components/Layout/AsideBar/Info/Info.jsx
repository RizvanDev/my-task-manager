import React, { useContext } from 'react'
import { Context } from '../../../../context'
import MyTitle from '../../../../Components/MyTitle/MyTitle'
import ListItem from '../ListItem/ListItem'
import './info.scss'

const Info = () => {
  const { authorization, modals, openModals } = useContext(Context)

  const handleClick = whatModal => {
    if (!authorization) {
      return openModals({ ...modals, authModal: true })
    }

    return whatModal === 'Statistics'
      ? openModals({ ...modals, statisticsModal: true })
      : openModals({ ...modals, compareModal: true })
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
        <ListItem onClick={() => handleClick('Statistics')}>
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
        <ListItem onClick={() => handleClick('Compare')}>
          <svg width='18' height='18' fill='none'>
            <path
              d='M17.25 4.5L10.125 11.625L6.375 7.875L0.75 13.5'
              stroke='#282846'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M12.75 4.5H17.25V9'
              stroke='#282846'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span>Compare</span>
        </ListItem>
      </ul>
    </div>
  )
}

export default Info
