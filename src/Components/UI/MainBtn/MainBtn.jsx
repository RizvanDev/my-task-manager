import React from 'react'
import cl from './mainBtn.module.scss'

const MainBtn = ({ children, styles, type, onClick }) => {
  return (
    <button type={type} className={cl.mainBtn} style={styles} onClick={onClick}>
      {children}
    </button>
  )
}

export default MainBtn
