import React, { useState } from 'react'
import cl from './addItem.module.scss'
import InputContainer from './InputContainer'

const AddItem = ({ listItems, setListItem, setTab }) => {
  const [state, setState] = useState({ invisible: false, visible: false })
  const [inputValue, setInputValue] = useState('')

  const classes = {
    addBtn: [cl.addItem__btn],
    inputContainer: [cl.addItem__input],
  }

  if (state.invisible || state.visible) {
    classes.addBtn.push(cl.invisible)
    classes.inputContainer.push(cl.visible)
  }

  const addNewCategory = () => {
    if (inputValue) {
      setInputValue('')
      setListItem([...listItems, inputValue])
      return setTab(inputValue)
    }
  }

  const closeNewCategory = () => {
    setInputValue('')
    return setState({ invisible: true, visible: true })
  }

  return (
    <div>
      <InputContainer
        addNewCategory={addNewCategory}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setState={setState}
        inputContainer={classes.inputContainer}
      />
      <button
        type='button'
        className={classes.addBtn.join(' ')}
        onKeyUp={addNewCategory}
        onClick={closeNewCategory}>
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
        <span>new category</span>
      </button>
    </div>
  )
}

export default AddItem
