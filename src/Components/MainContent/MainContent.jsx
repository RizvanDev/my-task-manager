import React from 'react'
import './mainContent.scss'
import MainTop from './MainTop/Main.top'
import Tasks from './Tasks/Tasks'
import DateContainer from './DateContainer/DateContainer'

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
          showTab={props.showTab}
          showingTab={props.showingTab}
          setCategory={props.setCategory}
          tabLoader={props.tabLoader}
          tabItems={props.tabItems}
          setTabItem={props.setTabItem}
          deleteTask={props.deleteTask}
          checkTask={props.checkTask}
          editTask={props.editTask}
        />
        <DateContainer darkMode={props.darkMode} />
      </main>
    </div>
  )
}

export default MainContent
