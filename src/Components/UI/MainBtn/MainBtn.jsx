import React from 'react'
import cl from './mainBtn.module.scss'

const MainBtn = ({ children, styles, onClick }) => {
  return (
    <button type='button' className={cl.mainBtn} style={styles} onClick={onClick}>
      {children}
    </button>
  )
}

export default MainBtn
