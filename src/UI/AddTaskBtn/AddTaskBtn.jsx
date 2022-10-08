import React from 'react'
import cl from './addTaskBtn.module.scss'

const AddTaskBtn = ({ children, ...styles }) => {
  return (
    <button type='button' className={cl.addTaskBtn} style={styles}>
      {children}
    </button>
  )
}

export default AddTaskBtn
