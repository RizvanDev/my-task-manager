import React from 'react'
import cl from './myTitle.module.scss'

const MyTitle = ({ children, ...styles }) => {
  return (
    <div className={cl.myTitle} style={styles}>
      {children}
    </div>
  )
}

export default MyTitle
