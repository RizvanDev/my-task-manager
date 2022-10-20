import React from 'react'
import './mainContent.scss'
import MainTop from './MainTop/Main.top'
import Tasks from './Tasks/Tasks'
import Time from './Time/Time'

const MainContent = props => {
  return (
    <div className='mainContent'>
      <MainTop
        darkMode={props.darkMode}
        setDarkMode={props.setDarkMode}
        tabItems={props.tabItems}
        setTaskModal={props.setTaskModal}
      />
      <main className='mainContent__main'>
        <Tasks
          darkMode={props.darkMode}
          tab={props.tab}
          setTab={props.setTab}
          tabItems={props.tabItems}
          setTabItem={props.setTabItem}
          deleteTask={props.deleteTask}
          checkTask={props.checkTask}
          editTask={props.editTask}
        />
        <Time darkMode={props.darkMode} />
      </main>
    </div>
  )
}

export default MainContent
