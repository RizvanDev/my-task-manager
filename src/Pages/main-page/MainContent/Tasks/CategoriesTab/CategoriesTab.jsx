import React, { createRef, useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './categoriesTab.scss'
import MyTitle from '../../../../../Components/MyTitle/MyTitle'
import CategoriesConfig from '../CategoriesConfig/CategoriesConfig'
import Task from '../Task/Task'
import useValue from '../../../../../hooks/useValue'
import { Context } from '../../../../../context'

const CategoriesTab = props => {
  const [modal, setModal] = useValue(false)

  const {
    darkMode,
    tab,
    setTab,
    setCategory,
    tabItems,
    setTabItem,
    editTask,
    checkTask,
    deleteTask,
    setSortType,
    pastTime,
  } = useContext(Context)

  const removeCategory = () => {
    const checkingTabs = tabItems[props.idx - 1] || tabItems[1]

    setTab(tabItems.length > 1 && checkingTabs.title)
    setCategory(tabItems.length > 1 && checkingTabs.title)

    return setTabItem(tabItems.filter(e => e.title !== props.category.title))
  }

  return (
    <div
      className={
        tab === props.category.title
          ? 'category__container active'
          : 'category__container'
      }>
      <div className='category__title'>{props.category.title}</div>
      <div className='category__activeTasks'>
        <MyTitle fontSize='18px' lineHeight='25px' letterSpacing='0.02em'>
          Active tasks
        </MyTitle>
        <TransitionGroup
          className={darkMode ? 'activeTasksContainer darkMode' : 'activeTasksContainer'}>
          {props.category.data
            .filter(task => !task.completed)
            .map(uncompletedTask => {
              const nodeRef = createRef(null)
              return (
                <CSSTransition
                  key={uncompletedTask.time}
                  nodeRef={nodeRef}
                  timeout={500}
                  classNames='task'>
                  <Task
                    time={uncompletedTask.time}
                    currentTask={uncompletedTask}
                    tabTitle={props.category.title}
                    deleteTask={deleteTask}
                    completed={uncompletedTask.completed}
                    checkTask={checkTask}
                    editTask={editTask}
                    pastTime={pastTime}
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
            darkMode ? 'completedTasksContainer darkMode' : 'completedTasksContainer'
          }>
          {props.category.data
            .filter(task => task.completed)
            .map(completedTask => {
              const nodeRef = createRef(null)
              return (
                <CSSTransition
                  key={completedTask.time}
                  nodeRef={nodeRef}
                  timeout={500}
                  classNames='task'>
                  <Task
                    time={completedTask.time}
                    currentTask={completedTask}
                    tabTitle={props.category.title}
                    deleteTask={deleteTask}
                    completed={completedTask.completed}
                    checkTask={checkTask}
                    pastTime={pastTime}
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
      <CategoriesConfig
        modal={modal}
        pastTime={pastTime}
        category={props.category}
        setSortType={setSortType}
        removeCategory={removeCategory}
      />
    </div>
  )
}

export default CategoriesTab