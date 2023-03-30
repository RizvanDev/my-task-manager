import { createRef } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import MyTitle from '../../../../../../Components/UI/MyTitle/MyTitle'
import Task from '../Task/Task'

const TasksContainer = ({ darkMode, tabTitle, tasksData, tasksMethods, timeLine, type }) => {
  const typeCondition = type === 'Active'

  const blockTitleStyles = {
    fontSize: '18px',
    lineHeight: '25px',
    letterSpacing: '0.02em',
  }

  if (window.matchMedia('(max-width: 1400px)').matches) {
    blockTitleStyles.fontSize = '16px'
    blockTitleStyles.lineHeight = '20px'
  }

  return (
    <div className={typeCondition ? 'activeTasks__block' : 'completedTasks__block'}>
      <MyTitle {...blockTitleStyles}>{type} tasks</MyTitle>

      <TransitionGroup
        className={typeCondition ? 'activeTasks__container' : 'completedTasks__container'}>
        {tasksData
          .filter(task => (typeCondition ? !task.completed : task.completed))
          .map(task => {
            const nodeRef = createRef(null)

            return (
              <CSSTransition key={task.time} nodeRef={nodeRef} timeout={500} classNames='task'>
                <Task
                  time={task.time}
                  currentTask={task}
                  tabTitle={tabTitle}
                  completed={task.completed}
                  tasksMethods={tasksMethods}
                  timeLine={timeLine}
                  darkMode={darkMode}
                  ref={nodeRef}>
                  {task.task}
                </Task>
              </CSSTransition>
            )
          })}
      </TransitionGroup>
    </div>
  )
}

export default TasksContainer
