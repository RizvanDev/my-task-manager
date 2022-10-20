import React from 'react'
import CategoriesTab from './CategoriesTab/CategoriesTab'
import './tasks.scss'

const Tasks = props => {
  const classes = ['mainContent__tabsContainer']

  if (props.darkMode) classes.push('darkMode')

  if (props.tabItems.length) {
    return (
      <div className={classes.join(' ')}>
        {props.tabItems.map((category, idx) => (
          <CategoriesTab
            darkMode={props.darkMode}
            key={category.title}
            category={category}
            idx={idx}
            tab={props.tab}
            setTab={props.setTab}
            tabItems={props.tabItems}
            setTabItem={props.setTabItem}
            deleteTask={props.deleteTask}
            checkTask={props.checkTask}
            editTask={props.editTask}
          />
        ))}
      </div>
    )
  }

  return <div className='noCategory'>create a category and add tasks</div>
}

export default Tasks
