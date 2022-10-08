import React from 'react'
import './listItem.scss'

const ListItem = ({ children, darkMode }) => {
  return (
    <button type='button' className={darkMode ? 'listItem darkMode' : 'listItem'}>
      {children}
    </button>
  )
}

export default ListItem
