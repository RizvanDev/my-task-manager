import React from 'react'
import cl from './input.module.scss'

const Input = React.forwardRef(({ ...props }, ref) => {
  return <input type='text' className={cl.myInput} {...props} ref={ref} />
})

export default Input
