import React from 'react'
import './categoriesTab.scss'
import MyTitle from '../../../MyTitle/MyTitle'
import CategoriesConfig from '../CategoriesConfig/CategoriesConfig'
import Task from '../Task/Task'
import useValue from '../../../../hooks/useValue'

const CategoriesTab = React.forwardRef((props, ref) => {
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
      }
      ref={ref}>
      <div className='category__title'>{props.category.title}</div>
      <div className='category__activeTasks'>
        <MyTitle fontSize='18px' lineHeight='25px' letterSpacing='0.02em'>
          Active tasks
        </MyTitle>
        <div
          className={
            props.darkMode ? 'activeTasksContainer darkMode' : 'activeTasksContainer'
          }>
          {props.category.data
            .filter(task => !task.completed)
            .map(uncompletedTask => (
              <Task
                key={uncompletedTask.date.time}
                date={uncompletedTask.date}
                currentTask={uncompletedTask}
                tabTitle={props.category.title}
                deleteTask={props.deleteTask}
                completed={uncompletedTask.completed}
                checkTask={props.checkTask}
                editTask={props.editTask}>
                {uncompletedTask.task}
              </Task>
            ))}
        </div>
      </div>
      <div className='category__completedTasks'>
        <MyTitle fontSize='18px' lineHeight='25px' letterSpacing='0.02em'>
          Completed tasks
        </MyTitle>
        <div
          className={
            props.darkMode
              ? 'completedTasksContainer darkMode'
              : 'completedTasksContainer'
          }>
          {props.category.data
            .filter(task => task.completed)
            .map(completedTask => (
              <Task
                key={completedTask.date.time}
                date={completedTask.date}
                currentTask={completedTask}
                tabTitle={props.category.title}
                deleteTask={props.deleteTask}
                completed={completedTask.completed}
                checkTask={props.checkTask}>
                {completedTask.task}
              </Task>
            ))}
        </div>
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
})

export default CategoriesTab
