import React from 'react'
import CategoryTask from './CategoryTask'
import './tasks.scss'

const Tasks = ({ darkMode, listItems, setListItem, tab, setTab }) => {
  const classes = ['mainContent__tasksContainer']

  if (darkMode) classes.push('darkMode')

  if (listItems.length) {
    return (
      <div className={classes.join(' ')}>
        {listItems.map((category, idx) => (
          <CategoryTask
            key={category}
            category={category}
            idx={idx}
            tab={tab}
            setTab={setTab}
            listItems={listItems}
            setListItem={setListItem}
          />
        ))}
      </div>
    )
  }

  return <div className='noCategory'>create a category and add tasks</div>
}

export default Tasks
