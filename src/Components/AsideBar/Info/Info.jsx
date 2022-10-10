import React from 'react'
import './info.scss'
import MyTitle from '../../MyTitle/MyTitle'
import ListItem from '../ListItem/ListItem'

const Info = ({ darkMode }) => {
  return (
    <div className='asideBar__info'>
      <MyTitle fontSize='24px' lineHeight='33px' letterSpacing='0.03em'>
        My data
      </MyTitle>
      <ul className='info__list'>
        <ListItem darkMode={darkMode}>
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
        <ListItem darkMode={darkMode}>
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
