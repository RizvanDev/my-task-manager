import React, { useContext } from 'react'
import CategoriesTab from './CategoriesTab/CategoriesTab'
import './tasks.scss'
import { Context } from '../../../context'

const Tasks = () => {
  const { tabItems, darkMode } = useContext(Context)

  if (tabItems.length) {
    return (
      <div
        className={
          darkMode ? 'mainContent__tabsContainer darkMode' : 'mainContent__tabsContainer'
        }>
        {tabItems.map((category, idx) => (
          <CategoriesTab key={category.title} category={category} idx={idx} />
        ))}
      </div>
    )
  }

  return <div className='noCategory'>create a category and add tasks</div>
}

export default Tasks
