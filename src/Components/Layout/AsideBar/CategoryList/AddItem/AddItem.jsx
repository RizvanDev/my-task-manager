import React, { useRef, useContext } from 'react'
import { database } from '../../../../../firebase/firebaseConfig'
import cl from './addItem.module.scss'
import InputContainer from './InputContainer'
import useValue from '../../../../../hooks/useValue'
import { Context } from '../../../../../context'

const AddItem = () => {
  const [state, setState] = useValue({ invisible: false, visible: false })
  const [inputValue, setInputValue, onChange] = useValue('')
  const inputRef = useRef(null)
  const { tabItems, setTabItem, setCategory, setTab, userInfo, calendarDate } =
    useContext(Context)

  const classes = {
    addBtn: [cl.addItem__btn],
    inputContainer: [cl.addItem__input],
  }

  if (state.invisible || state.visible) {
    classes.addBtn.push(cl.invisible)
    classes.inputContainer.push(cl.visible)
  }

  const showInputContainer = (invisible, visible) => {
    if (inputValue) setInputValue('')
    setTimeout(() => inputRef.current.focus(), 500)
    return setState({ invisible, visible })
  }

  const desiredElement = tabItems.tasks.find(tab => tab.title === inputValue)

  const addNewCategory = () => {
    if (inputValue && !desiredElement) {
      setInputValue('')

      setTabItem({
        ...tabItems,
        tasks: [
          ...tabItems.tasks,
          { title: inputValue, sortingType: 'newest first', data: [] },
        ],
      })

      setState({ invisible: false, visible: false })
      setCategory(inputValue)
      setTab(inputValue)

      database.writeUserTasksData(
        userInfo.uid,
        calendarDate.toLocaleDateString().split('.').join(''),
        {
          ...tabItems,
          tasks: [
            ...tabItems.tasks,
            { title: inputValue, sortingType: 'newest first', data: [] },
          ],
        },
      )
    }
  }
  return (
    <div>
      <InputContainer
        addNewCategory={addNewCategory}
        showInputContainer={showInputContainer}
        inputValue={inputValue}
        setInputValue={onChange}
        inputContainer={classes.inputContainer}
        ref={inputRef}
      />
      <button
        type='button'
        className={classes.addBtn.join(' ')}
        onClick={() => showInputContainer(true, true)}>
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
