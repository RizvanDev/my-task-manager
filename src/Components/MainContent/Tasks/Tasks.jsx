import React from 'react'
import CategoriesTab from './CategoriesTab/CategoriesTab'
import './tasks.scss'

const Tasks = props => {
  if (props.tabItems.length) {
    return (
      <div
        className={
          props.darkMode
            ? 'mainContent__tabsContainer darkMode'
            : 'mainContent__tabsContainer'
        }>
        {props.tabItems.map((category, idx) => (
          <CategoriesTab
            key={category.title}
            darkMode={props.darkMode}
            category={category}
            idx={idx}
            tab={props.tab}
            setTab={props.setTab}
            setCategory={props.setCategory}
            tabItems={props.tabItems}
            setTabItem={props.setTabItem}
            deleteTask={props.deleteTask}
            checkTask={props.checkTask}
            editTask={props.editTask}
            ref={category.nodeRef}
          />
        ))}
      </div>
    )
  }

  return <div className='noCategory'>create a category and add tasks</div>
}

export default Tasks
