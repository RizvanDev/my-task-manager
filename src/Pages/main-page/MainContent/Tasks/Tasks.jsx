import { useContext } from 'react'
import { Context } from '../../../../context'
import CategoriesTab from './CategoriesTab/CategoriesTab'
import './tasks.scss'

const Tasks = () => {
  const { tabItems, darkMode } = useContext(Context)

  return tabItems.tabs.length ? (
    <div
      className={darkMode ? 'mainContent__tabsContainer darkMode' : 'mainContent__tabsContainer'}>
      {tabItems.tabs.map((category, idx) => (
        <CategoriesTab key={category.title} category={category} idx={idx} />
      ))}
    </div>
  ) : (
    <div className='noCategory'>create a category and add tasks</div>
  )
}

export default Tasks
