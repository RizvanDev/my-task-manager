import React, { useContext } from 'react'
import cl from './taskModal.module.scss'
import MyTitle from '../MyTitle/MyTitle'
import Input from '../UI/Input/Input'
import MainBtn from '../UI/MainBtn/MainBtn'
import Select from '../UI/Select/Select'
import useValue from '../../hooks/useValue'
import { Context } from '../../context'

const TaskModal = () => {
  const [inputValue, setInputValue, inputOnChange] = useValue('')

  const {
    darkMode,
    createTask,
    taskModal,
    setTaskModal,
    tabItems,
    category,
    categorySelectOnChange,
  } = useContext(Context)

  const addTask = () => inputValue && createTask(inputValue, setInputValue)

  const onKeyUp = e => {
    if (e.code === 'Enter' && inputValue) {
      return createTask(inputValue, setInputValue)
    }
  }

  const classes = { modal: [cl.taskModal], modalContainer: [cl.taskModal__container] }

  if (taskModal) classes.modal.push(cl.open)
  if (darkMode) classes.modalContainer.push(cl.darkMode)

  const styleObj = {
    selectStyles: {
      width: '200px',
      padding: '8px 15px',
      border: '1px solid rgba(40, 40, 70, 0.3)',
      borderRadius: '8px',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '19px',
      letterSpacing: '0.02em',
      option: {
        fontSize: '16px',
        color: '#666',
      },
    },
    inputStyles: {
      width: '660px',
      padding: '8px 15px',
      border: '1px solid rgba(40, 40, 70, 0.3)',
      letterSpacing: '0.02em',
      fontSize: '16px',
    },
    cancelBtnStyles: {
      padding: '10px 25px',
      backgroundColor: 'transparent',
      border: '1px solid  #29a19c',
      borderRadius: '8px',
      fontSize: '16px',
    },
    addBtnStyles: {
      backgroundColor: '#29a19c',
      padding: '10px 25px',
      color: '#fafafa',
      borderRadius: '8px',
      fontSize: '16px',
    },
  }

  return (
    <div className={classes.modal.join(' ')} onClick={() => setTaskModal(false)}>
      <div
        className={classes.modalContainer.join(' ')}
        onClick={e => e.stopPropagation()}>
        <MyTitle
          fontWeight='700'
          fontSize='20px'
          lineHeight='27px'
          letterSpacing='0.02em'>
          Add new task
        </MyTitle>
        <div className={cl.taskModal__inputsContainer}>
          <div>
            <span className={cl.taskModal__helpText}>Category</span>
            <Select
              styles={styleObj.selectStyles}
              options={tabItems}
              value={category}
              onChange={categorySelectOnChange}
            />
          </div>
          <div>
            <span className={cl.taskModal__helpText}>Create new task</span>
            <Input
              style={styleObj.inputStyles}
              placeholder='What should I do?'
              value={inputValue}
              onChange={inputOnChange}
              onKeyUp={onKeyUp}
            />
          </div>
        </div>
        <div className={cl.taskModal__btnContainer}>
          <MainBtn styles={styleObj.cancelBtnStyles} onClick={() => setTaskModal(false)}>
            Cancel
          </MainBtn>
          <MainBtn styles={styleObj.addBtnStyles} onClick={addTask}>
            Add
          </MainBtn>
        </div>
      </div>
    </div>
  )
}

export default TaskModal
