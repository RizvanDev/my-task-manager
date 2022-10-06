import React from 'react'
import './listItem.scss'

const ListItem = ({ children }) => {
  return (
    <button type='button' className='listItem'>
      {children}
    </button>
  )
}

export default ListItem
