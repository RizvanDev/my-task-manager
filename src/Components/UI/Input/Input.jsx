import React from 'react'
import cl from './input.module.scss'

const Input = ({ ...props }) => {
  const styles = { ...props.style }

  return <input type='text' className={cl.myInput} style={styles} {...props} />
}

export default Input
