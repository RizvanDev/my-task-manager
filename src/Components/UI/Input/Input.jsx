import React from 'react'
import cl from './input.module.scss'

const Input = React.forwardRef((props, ref) => {
  return (
    <input
      type='text'
      className={cl.myInput}
      style={props.style}
      placeholder={props.placeholder}
      value={props.value}
      onChange={event => props.onChange(event.target.value)}
      onKeyUp={event => props.onKeyUp(event)}
      ref={ref}
    />
  )
})

export default Input
