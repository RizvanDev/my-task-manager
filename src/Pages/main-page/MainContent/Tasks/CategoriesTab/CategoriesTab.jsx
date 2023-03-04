import { useContext } from 'react'
import { Context } from '../../../../../context'
import { database } from '../../../../../firebase/firebaseConfig'
import useValue from '../../../../../hooks/useValue'
import CategoryHeader from './CategoryHeader'
import TasksContainer from './TasksContainer'
import CategoriesConfig from '../CategoriesConfig/CategoriesConfig'
import DeleteCategoryModal from '../../../modalWindows/DeleteCategoryModal/DeleteCategoryModal'
import './categoriesTab.scss'

const CategoriesTab = ({ category, idx }) => {
  const [categoryConfigModal, setCategoryConfigModal] = useValue(false)

  const {
    darkMode,
    tab,
    setTab,
    setCategory,
    tabItems,
    setTabItems,
    timeLine,
    userInfo,
    calendarDate,
    modals,
    openModals,
    tasksMethods,
  } = useContext(Context)

  const removeCategory = () => {
    const newTabItems = tabItems.tabs.filter(task => task.title !== category.title)

    const tab = tabItems.tabs.length > 1 && (tabItems.tabs[idx - 1] || tabItems.tabs[1])

    setTab(tab.title)
    setCategory(tab.title)

    setTabItems({ ...tabItems, tabs: newTabItems })

    return database.writeUserTasksData(
      userInfo.uid,
      calendarDate.toLocaleDateString().split('.').join(''),
      newTabItems,
    )
  }

  const handleDeleteCategory = () => openModals({ ...modals, deleteCategoryModal: true })

  const tasksContainerProps = {
    darkMode,
    tabTitle: category.title,
    tasksData: category.data,
    tasksMethods,
    timeLine,
  }

  const categoryContainerClassNames =
    tab === category.title ? 'category__container active' : 'category__container'

  return (
    <div className={categoryContainerClassNames}>
      <CategoryHeader
        categoryTitle={category.title}
        categoryConfigModal={categoryConfigModal}
        setCategoryConfigModal={setCategoryConfigModal}
      />

      <CategoriesConfig
        categoryConfigModal={categoryConfigModal}
        timeLine={timeLine}
        category={category}
        setSortType={tasksMethods.setSortType}
        handleDeleteCategory={handleDeleteCategory}
        darkMode={darkMode}
      />

      <TasksContainer type='Active' {...tasksContainerProps} />
      {!timeLine.future && <TasksContainer type='Completed' {...tasksContainerProps} />}

      <DeleteCategoryModal removeCategory={removeCategory} />
    </div>
  )
}

export default CategoriesTab
