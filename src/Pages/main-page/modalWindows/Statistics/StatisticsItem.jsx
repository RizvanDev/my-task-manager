import React from 'react'

const StatisticsItem = ({ itemName, count }) => {
  return (
    <div className='statistics__item'>
      <span>{itemName}</span>
      <div className='statistics__item-info'>
        <div className='statistics__item-count'>{count}</div>
        <span>{itemName ? 'Tasks' : 'Categories'}</span>
      </div>
    </div>
  )
}

export default StatisticsItem
