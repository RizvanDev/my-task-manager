import React, { useState } from 'react'
import cl from './taskModal.module.scss'
import MyTitle from '../MyTitle/MyTitle'
import Input from '../UI/Input/Input'
import MainBtn from '../UI/MainBtn/MainBtn'

const TaskModal = props => {
  const [task, setTask] = useState({ input: '', select: '' })

  const classes = { modal: [cl.taskModal], modalContainer: [cl.taskModal__container] }

  if (props.taskModal) classes.modal.push(cl.open)
  if (props.darkMode) classes.modalContainer.push(cl.darkMode)

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
    <div className={classes.modal.join(' ')} onClick={() => props.setTaskModal(false)}>
      <div className={classes.modalContainer.join(' ')} onClick={e => e.stopPropagation()}>
        <MyTitle fontWeight='700' fontSize='20px' lineHeight='27px' letterSpacing='0.02em'>
          Add new task
        </MyTitle>
        <div className={cl.taskModal__inputsContainer}>
          <div>
            <span className={cl.taskModal__helpText}>Category</span>
            <select
              className={cl.taskModal__section}
              value={task.select}
              onChange={e => setTask({ ...task, select: e.target.value })}>
              <option>check category</option>
              {props.tabItems.map(item => (
                <option key={item.title}>{item.title}</option>
              ))}
            </select>
          </div>
          <div>
            <span className={cl.taskModal__helpText}>Create new task</span>
            <Input
              style={styleObj.inputStyles}
              placeholder='What should I do?'
              value={task.input}
              onChange={e => setTask({ ...task, input: e.target.value })}
              onKeyUp={e =>
                e.code === 'Enter' && task.input && task.select
                  ? props.createTask(task, setTask)
                  : false
              }
            />
          </div>
        </div>
        <div className={cl.taskModal__btnContainer}>
          <MainBtn styles={styleObj.cancelBtnStyles} onClick={() => props.setTaskModal(false)}>
            Cancel
          </MainBtn>
          <MainBtn
            styles={styleObj.addBtnStyles}
            onClick={() => (task.input && task.select ? props.createTask(task, setTask) : false)}>
            Add
          </MainBtn>
        </div>
      </div>
    </div>
  )
}

export default TaskModal
