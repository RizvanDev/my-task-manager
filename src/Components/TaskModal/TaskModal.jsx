import React from 'react'
import cl from './taskModal.module.scss'
import MyTitle from '../MyTitle/MyTitle'
import Input from '../UI/Input/Input'
import MainBtn from '../UI/MainBtn/MainBtn'

const TaskModal = ({ darkMode, taskModal, setTaskModal, listItems }) => {
  const classes = { modal: [cl.taskModal], modalContainer: [cl.taskModal__container] }

  if (taskModal) classes.modal.push(cl.open)
  if (darkMode) classes.modalContainer.push(cl.darkMode)

  const styleObj = {
    inputStyles: {
      width: '660px',
      padding: '8px 15px',
      letterSpacing: '0.02em',
      fontSize: '16px',
    },
    cancelBtnStyles: {
      padding: '10px 25px',
      backgroundColor: 'transparent',
      border: '1px solid  #29a19c',
    },
    addBtnStyles: {
      padding: '10px 25px',
      color: '#fafafa',
    },
  }

  return (
    <div className={classes.modal.join(' ')} onClick={() => setTaskModal(false)}>
      <div className={classes.modalContainer.join(' ')} onClick={e => e.stopPropagation()}>
        <MyTitle fontWeight='700' fontSize='20px' lineHeight='27px' letterSpacing='0.02em'>
          Add new task
        </MyTitle>
        <div className={cl.taskModal__inputsContainer}>
          <div>
            <span className={cl.taskModal__helpText}>What should I do?</span>
            <Input style={styleObj.inputStyles} placeholder='task' />
          </div>
          <div>
            <span className={cl.taskModal__helpText}>Category</span>
            <select className={cl.taskModal__section}>
              {listItems.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={cl.taskModal__btnContainer}>
          <MainBtn styles={styleObj.cancelBtnStyles} onClick={() => setTaskModal(false)}>
            Cancel
          </MainBtn>
          <MainBtn styles={styleObj.addBtnStyles}>Add</MainBtn>
        </div>
      </div>
    </div>
  )
}

export default TaskModal
