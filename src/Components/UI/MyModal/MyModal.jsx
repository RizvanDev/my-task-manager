import React from 'react'
import cl from './myModal.module.scss'

const MyModal = ({ children, ...props }) => {
  const classes = { modal: [cl.modal], modal__container: [cl.modal__container] }

  if (props.opened) classes.modal.push(cl.open)
  if (props.darkMode) classes.modal__container.push(cl.darkMode)

  return (
    <div
      className={classes.modal.join(' ')}
      style={props.styles.modal}
      onClick={props.closeModal}>
      <div
        className={classes.modal__container.join(' ')}
        style={props.styles.modalContainer}
        onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default MyModal
