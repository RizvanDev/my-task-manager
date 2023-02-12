import React from 'react'

const Input = React.forwardRef(({ ...props }, ref) => {
  const style = { border: '1px solid rgba(40, 40, 70, 0.3)', borderRadius: '10px' }

  return <input style={style} {...props} ref={ref} />
})

export default Input
