import React from 'react'
import Input from '../../../../../Components/UI/Input/Input'
import cl from './addItem.module.scss'

const InputContainer = React.forwardRef((props, ref) => {
  const inputStyles = {
    maxWidth: '90%',
    padding: '7px 0 7px 5px',
    fontSize: '14px',
  }

  const enterKeyUp = e => (e.code === 'Enter' ? props.addNewCategory() : false)

  return (
    <div className={props.inputContainer.join(' ')}>
      <Input
        placeholder='add category'
        style={inputStyles}
        value={props.inputValue}
        onChange={props.setInputValue}
        onKeyUp={enterKeyUp}
        maxLength={18}
        ref={ref}
      />
      <div className={cl.btn__container}>
        <button
          type='button'
          className={cl.addItem__addItem}
          onClick={props.addNewCategory}>
          add
        </button>
        <button
          type='button'
          className={cl.addItem__close}
          onClick={() => props.showInputContainer(false, false)}>
          cancel
        </button>
      </div>
    </div>
  )
})

export default InputContainer
