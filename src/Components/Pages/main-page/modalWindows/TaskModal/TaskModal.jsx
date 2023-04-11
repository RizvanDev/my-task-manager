import { useContext } from 'react'
import { Context } from '../../../../../context'
import MyTitle from '../../../../../Components/UI/MyTitle/MyTitle'
import Input from '../../../../../Components/UI/Input/Input'
import MainBtn from '../../../../../Components/UI/MainBtn/MainBtn'
import Select from '../../../../../Components/UI/Select/Select'
import MyModal from '../../../../../Components/UI/MyModal/MyModal'
import useValue from '../../../../../hooks/useValue'
import cl from './taskModal.module.scss'

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

  return (
    <MyModal darkMode={darkMode} opened={modals.taskModal} closeModal={handleCloseModal}>
      <MyTitle fontWeight='700' fontSize='20px' lineHeight='27px' letterSpacing='0.02em'>
        New task
      </MyTitle>
      <div className={cl.inputsContainer}>
        <div>
          <span className={cl.helpText}>Category</span>
          <Select
            className={cl.select}
            options={tabItems.tabs}
            value={category}
            onChange={categorySelectOnChange}
          />
        </div>
        <div>
          <span className={cl.helpText}>Create new task</span>
          <Input
            className={cl.input}
            placeholder='What should I do?'
            value={inputValue}
            onChange={inputOnChange}
            onKeyUp={onKeyUp}
          />
        </div>
      </div>
      <div className={cl.btnContainer}>
        <MainBtn className={[cl.btn, cl.close].join(' ')} type='button' onClick={handleCloseModal}>
          Cancel
        </MainBtn>
        <MainBtn
          className={[cl.btn, cl.add].join(' ')}
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
