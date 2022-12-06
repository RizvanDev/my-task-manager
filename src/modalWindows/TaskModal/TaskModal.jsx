import React, { useContext } from 'react'
import cl from './taskModal.module.scss'
import MyTitle from '../../Components/MyTitle/MyTitle'
import Input from '../../Components/UI/Input/Input'
import MainBtn from '../../Components/UI/MainBtn/MainBtn'
import Select from '../../Components/UI/Select/Select'
import MyModal from '../../Components/UI/MyModal/MyModal'
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

  const styleObj = {
    modalStyles: {
      modal: {
        backgroundColor: '#0007',
        transition: 'all .0.2s ease 0s',
      },
      modalContainer: {
        maxWidth: '700px',
        padding: '20px',
        borderRadius: '10px',
        transition: 'all 0.5s ease 0.1s',
      },
    },
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
    <MyModal
      styles={styleObj.modalStyles}
      darkMode={darkMode}
      opened={taskModal}
      closeModal={() => setTaskModal(false)}>
      <MyTitle fontWeight='700' fontSize='20px' lineHeight='27px' letterSpacing='0.02em'>
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
        <MainBtn
          type='button'
          styles={styleObj.cancelBtnStyles}
          onClick={() => setTaskModal(false)}>
          Cancel
        </MainBtn>
        <MainBtn type='button' styles={styleObj.addBtnStyles} onClick={addTask}>
          Add
        </MainBtn>
      </div>
    </MyModal>
  )
}

export default TaskModal
