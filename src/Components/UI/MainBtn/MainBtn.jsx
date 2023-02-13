import React from 'react'
import './mainBtn.scss'

const MainBtn = ({ children, type, styles, onClick }) => {
  return (
    <button className='mainBtn' type={type} style={styles} onClick={onClick}>
      {children}
    </button>
  )
}

export default MainBtn
