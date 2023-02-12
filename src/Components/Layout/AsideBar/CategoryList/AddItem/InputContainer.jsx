import React from 'react'
import Input from '../../../../../Components/UI/Input/Input'

const InputContainer = React.forwardRef((props, ref) => {
  const enterKeyUp = e => (e.code === 'Enter' ? props.addNewCategory() : false)

  return (
    <div
      className={
        props.inputContainer.invisible || props.inputContainer.visible
          ? 'addItem__inputContainer visible'
          : 'addItem__inputContainer'
      }>
      <Input
        className='addItem__input'
        placeholder='add category'
        value={props.inputValue}
        onChange={props.setInputValue}
        onKeyUp={enterKeyUp}
        maxLength={18}
        ref={ref}
      />
      <div className='btn__container'>
        <button type='button' className='addItem__addItem' onClick={props.addNewCategory}>
          add
        </button>
        <button
          type='button'
          className='addItem__close'
          onClick={() => props.showInputContainer(false, false)}>
          cancel
        </button>
      </div>
    </div>
  )
})

export default InputContainer
