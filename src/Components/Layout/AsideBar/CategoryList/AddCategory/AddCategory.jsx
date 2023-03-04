import { useRef, useContext, useEffect } from 'react'
import InputContainer from './InputContainer'
import useValue from '../../../../../hooks/useValue'
import MainBtn from '../../../../UI/MainBtn/MainBtn'
import { Context } from '../../../../../context'
import { database } from '../../../../../firebase/firebaseConfig'
import './addCategory.scss'

const AddCategory = () => {
  const [inputValue, setInputValue, onChange] = useValue('')
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  const {
    tabItems,
    setTabItems,
    setCategory,
    containerAddCategory,
    showContainerAddCategory,
    setTab,
    userInfo,
    calendarDate,
    openSideMenu,
  } = useContext(Context)

  const toggleInputContainer = () => {
    inputValue && setInputValue('')
    setTimeout(() => inputRef.current.focus(), 300)
    showContainerAddCategory(!containerAddCategory)
  }

  const desiredElement = tabItems.tabs.find(tab => tab.title === inputValue)

  const addNewCategory = () => {
    if (inputValue && !desiredElement) {
      setInputValue('')

      const newTab = { title: inputValue, sortingType: 'newest first', data: [] }
      const newTabItems = [...tabItems.tabs, newTab]

      setTabItems({ ...tabItems, tabs: newTabItems })
      showContainerAddCategory(!containerAddCategory)
      setCategory(inputValue)
      setTab(inputValue)
      openSideMenu(false)

      return database.writeUserTasksData(
        userInfo.uid,
        calendarDate.toLocaleDateString().replaceAll('.', ''),
        newTabItems,
      )
    }
  }

  const handleClickOutside = e => {
    const mainTopBtnEl = e.target.className !== 'mainContent__top-btn',
      mainTopBtnChildEl = e.target.parentElement.className !== 'mainContent__top-btn'

    const anotherOutsideEl = mainTopBtnChildEl && mainTopBtnEl

    if (!containerRef.current.contains(e.target) && anotherOutsideEl) {
      showContainerAddCategory(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, { passive: true })
    return () => document.removeEventListener('click', handleClickOutside)
  }, [containerAddCategory])

  return (
    <div ref={containerRef}>
      <InputContainer
        addNewCategory={addNewCategory}
        toggleInputContainer={toggleInputContainer}
        inputValue={inputValue}
        setInputValue={onChange}
        visibleContainer={containerAddCategory}
        desiredElement={desiredElement}
        ref={inputRef}
      />

      <MainBtn
        className={containerAddCategory ? 'addCategory__btn invisible' : 'addCategory__btn'}
        type='button'
        onClick={toggleInputContainer}>
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
      </MainBtn>
    </div>
  )
}

export default AddCategory
