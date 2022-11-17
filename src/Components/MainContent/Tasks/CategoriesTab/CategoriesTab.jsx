import React, { createRef } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './categoriesTab.scss'
import MyTitle from '../../../MyTitle/MyTitle'
import CategoriesConfig from '../CategoriesConfig/CategoriesConfig'
import Task from '../Task/Task'
import useValue from '../../../../hooks/useValue'

const CategoriesTab = props => {
  const [modal, setModal] = useValue(false)

  const removeCategory = () => {
    const checkingTabs = props.tabItems[props.idx - 1] || props.tabItems[1]

    props.setTab(props.tabItems.length > 1 && checkingTabs.title)
    props.setCategory(props.tabItems.length > 1 && checkingTabs.title)

    return props.setTabItem(props.tabItems.filter(e => e.title !== props.category.title))
  }

  return (
    <div
      className={
        props.tab === props.category.title
          ? 'category__container active'
          : 'category__container'
      }>
      <div className='category__title'>{props.category.title}</div>
      <div className='category__activeTasks'>
        <MyTitle fontSize='18px' lineHeight='25px' letterSpacing='0.02em'>
          Active tasks
        </MyTitle>
        <TransitionGroup
          className={
            props.darkMode ? 'activeTasksContainer darkMode' : 'activeTasksContainer'
          }>
          {props.category.data
            .filter(task => !task.completed)
            .map(uncompletedTask => {
              const nodeRef = createRef(null)
              return (
                <CSSTransition
                  key={uncompletedTask.date.time}
                  nodeRef={nodeRef}
                  timeout={500}
                  classNames='task'>
                  <Task
                    date={uncompletedTask.date}
                    currentTask={uncompletedTask}
                    tabTitle={props.category.title}
                    deleteTask={props.deleteTask}
                    completed={uncompletedTask.completed}
                    checkTask={props.checkTask}
                    editTask={props.editTask}
                    ref={nodeRef}>
                    {uncompletedTask.task}
                  </Task>
                </CSSTransition>
              )
            })}
        </TransitionGroup>
      </div>
      <div className='category__completedTasks'>
        <MyTitle fontSize='18px' lineHeight='25px' letterSpacing='0.02em'>
          Completed tasks
        </MyTitle>
        <TransitionGroup
          className={
            props.darkMode
              ? 'completedTasksContainer darkMode'
              : 'completedTasksContainer'
          }>
          {props.category.data
            .filter(task => task.completed)
            .map(completedTask => {
              const nodeRef = createRef(null)
              return (
                <CSSTransition
                  key={completedTask.date.time}
                  nodeRef={nodeRef}
                  timeout={500}
                  classNames='task'>
                  <Task
                    date={completedTask.date}
                    currentTask={completedTask}
                    tabTitle={props.category.title}
                    deleteTask={props.deleteTask}
                    completed={completedTask.completed}
                    checkTask={props.checkTask}
                    ref={nodeRef}>
                    {completedTask.task}
                  </Task>
                </CSSTransition>
              )
            })}
        </TransitionGroup>
      </div>
      <button
        type='button'
        className='category__configBtn'
        title='configuration'
        onClick={() => setModal(!modal)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <CategoriesConfig modal={modal} removeCategory={removeCategory} />
    </div>
  )
}

export default CategoriesTab
