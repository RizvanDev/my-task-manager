import { useContext, useRef, useEffect } from 'react'
import { Context } from '../../../../context'
import './listItem.scss'

const ListItem = ({ children, onClick }) => {
  const { darkMode, tab } = useContext(Context)
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current !== null) {
      tab === ref.current.outerText
        ? ref.current.classList.add('selected')
        : ref.current.classList.remove('selected')
    }
  })

  const fontSize = `calc(${children.length > 16 ? '9px' : '12px'} + 5 * (100vw / 1920))`

  return (
    <span
      className={darkMode ? 'listItem darkMode' : 'listItem'}
      style={{ fontSize }}
      ref={ref}
      onClick={onClick}>
      {children}
    </span>
  )
}

export default ListItem
