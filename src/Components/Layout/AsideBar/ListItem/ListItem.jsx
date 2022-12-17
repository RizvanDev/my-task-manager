import React from 'react'
import { Link } from 'react-router-dom'
import './listItem.scss'

const ListItem = ({ children, darkMode, onClick }) => {
  return (
    <Link
      to='/'
      type='button'
      className={darkMode ? 'listItem darkMode' : 'listItem'}
      onClick={onClick}>
      {children}
    </Link>
  )
}

export default ListItem
