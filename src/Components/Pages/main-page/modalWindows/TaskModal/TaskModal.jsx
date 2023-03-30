import { useContext } from 'react'
import { Context } from '../../../../../context'
import MyTitle from '../../../../../Components/UI/MyTitle/MyTitle'
import Input from '../../../../../Components/UI/Input/Input'
import MainBtn from '../../../../../Components/UI/MainBtn/MainBtn'
import Select from '../../../../../Components/UI/Select/Select'
import MyModal from '../../../../../Components/UI/MyModal/MyModal'
import useValue from '../../../../../hooks/useValue'
import './taskModal.scss'

const TaskModal = () => {
  const [inputValue, setInputValue, inputOnChange] = useValue('')

  const { darkMode, tasksMethods, modals, openModals, tabItems, category, categorySelectOnChange } =
    useContext(Context)

  const handleAddTask = () => tasksMethods.createTask(inputValue, setInputValue)

  const onKeyUp = e => {
    if (e.code === 'Enter' && inputValue) {
      return tasksMethods.createTask(inputValue, setInputValue)
    }
  }

  const handleCloseModal = () => openModals(prev => ({ ...prev, taskModal: false }))

  const selectStyles = {
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
  }

  return (
    <MyModal darkMode={darkMode} opened={modals.taskModal} closeModal={handleCloseModal}>
      <MyTitle fontWeight='700' fontSize='20px' lineHeight='27px' letterSpacing='0.02em'>
        New task
      </MyTitle>
      <div className='taskModal__inputsContainer'>
        <div>
          <span className='taskModal__helpText'>Category</span>
          <Select
            styles={selectStyles}
            options={tabItems.tabs}
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
        <MainBtn className='taskModal__btn --close' type='button' onClick={handleCloseModal}>
          Cancel
        </MainBtn>
        <MainBtn
          className='taskModal__btn --add'
          type='button'
          onClick={handleAddTask}
          disabled={!inputValue}>
          Add
        </MainBtn>
      </div>
    </MyModal>
  )
}

export default TaskModal
