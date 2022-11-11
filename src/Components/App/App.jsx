import React from 'react'
import './App.scss'
import AsideBar from '../AsideBar/AsideBar'
import MainContent from '../MainContent/MainContent'
import TaskModal from '../TaskModal/TaskModal'
import { withApp } from '../../hoc/withApp'

const App = props => {
  return (
    <div className={props.darkMode ? 'App darkMode' : 'App'}>
      <div className='app__container'>
        <AsideBar
          darkMode={props.darkMode}
          tabItems={props.tabItems}
          setTabItem={props.setTabItem}
          tab={props.tab}
          setTab={props.setTab}
          setCategory={props.setCategory}
        />
        <MainContent
          darkMode={props.darkMode}
          setDarkMode={props.setDarkMode}
          setTaskModal={props.setTaskModal}
          tabItems={props.tabItems}
          setTabItem={props.setTabItem}
          deleteTask={props.deleteTask}
          checkTask={props.checkTask}
          editTask={props.editTask}
          tab={props.tab}
          setTab={props.setTab}
        />
        <TaskModal
          darkMode={props.darkMode}
          taskModal={props.taskModal}
          setTaskModal={props.setTaskModal}
          tabItems={props.tabItems}
          createTask={props.createTask}
          category={props.category}
          selectOnChange={props.selectOnChange}
        />
      </div>
    </div>
  )
}

export default withApp(App)
