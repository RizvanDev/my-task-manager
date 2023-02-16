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
    <button
      style={{ fontSize }}
      ref={ref}
      type='button'
      className={darkMode ? 'listItem darkMode' : 'listItem'}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default ListItem
