import React from 'react'
import cl from './addItem.module.scss'
import Input from '../Input/Input'

const InputContainer = props => {
  const inputStyles = {
    padding: '7px 30px 7px 5px',
    fontSize: '14px',
  }

  return (
    <div className={props.inputContainer.join(' ')}>
      <Input
        style={inputStyles}
        value={props.inputValue}
        onChange={e => props.setInputValue(e.target.value)}
      />
      <button type='button' className={cl.addItem__addItem} onClick={props.addNewCategory}>
        <svg width='18' height='18' fill='none'>
          <path
            d='M14.25 2.25H3.75C2.92157 2.25 2.25 2.92157 2.25 3.75V14.25C2.25 15.0784 2.92157 15.75 3.75 15.75H14.25C15.0784 15.75 15.75 15.0784 15.75 14.25V3.75C15.75 2.92157 15.0784 2.25 14.25 2.25Z'
            stroke='#29A19C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M9 6V12'
            stroke='#29A19C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M6 9H12'
            stroke='#29A19C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
      <button
        type='button'
        className={cl.addItem__close}
        onClick={() => props.setState({ invisible: false, visible: false })}>
        X
      </button>
    </div>
  )
}

export default InputContainer
