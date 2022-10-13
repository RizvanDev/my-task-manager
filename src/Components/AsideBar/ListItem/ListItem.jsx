import React from 'react'
import './listItem.scss'

const ListItem = ({ children, darkMode, onClick }) => {
  return (
    <button type='button' className={darkMode ? 'listItem darkMode' : 'listItem'} onClick={onClick}>
      {children}
    </button>
  )
}

export default ListItem
