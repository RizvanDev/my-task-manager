import { useContext } from 'react'
import { Context } from '../../../../context'
import MyTitle from '../../../../Components/MyTitle/MyTitle'
import Input from '../../../../Components/UI/Input/Input'
import MainBtn from '../../../../Components/UI/MainBtn/MainBtn'
import Select from '../../../../Components/UI/Select/Select'
import MyModal from '../../../../Components/UI/MyModal/MyModal'
import useValue from '../../../../hooks/useValue'
import './taskModal.scss'

const TaskModal = () => {
  const [inputValue, setInputValue, inputOnChange] = useValue('')

  const {
    darkMode,
    tasksMethods,
    modals,
    openModals,
    tabItems,
    category,
    categorySelectOnChange,
  } = useContext(Context)

  const addTask = () => inputValue && tasksMethods.createTask(inputValue, setInputValue)

  const onKeyUp = e => {
    if (e.code === 'Enter' && inputValue) {
      return tasksMethods.createTask(inputValue, setInputValue)
    }
  }

  const closeTaskModal = () => openModals({ ...modals, taskModal: false })

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
    <MyModal darkMode={darkMode} opened={modals.taskModal} closeModal={closeTaskModal}>
      <MyTitle fontWeight='700' fontSize='20px' lineHeight='27px' letterSpacing='0.02em'>
        New task
      </MyTitle>
      <div className='taskModal__inputsContainer'>
        <div>
          <span className='taskModal__helpText'>Category</span>
          <Select
            styles={styleObj.selectStyles}
            options={tabItems.tasks}
            value={category}
            onChange={categorySelectOnChange}
          />
        </div>
        <div>
          <span className='taskModal__helpText'>Create new task</span>
          <Input
            className='taskModal__input'
            placeholder='What should I do?'
            value={inputValue}
            onChange={inputOnChange}
            onKeyUp={onKeyUp}
          />
        </div>
      </div>
      <div className='taskModal__btnContainer'>
        <MainBtn type='button' styles={styleObj.cancelBtnStyles} onClick={closeTaskModal}>
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
