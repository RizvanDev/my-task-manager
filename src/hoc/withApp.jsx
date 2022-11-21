import useValue from '../hooks/useValue'
import useLocaleStorage from '../hooks/useLocaleStorage'
import { useEffect } from 'react'
import { Context } from '../context'

const defaultItems = [
  { title: 'Home', sortingType: 'newest first', data: [] },
  { title: 'Work', sortingType: 'newest first', data: [] },
  { title: 'Sport', sortingType: 'newest first', data: [] },
]

const withApp = Component => {
  return () => {
    const [darkMode, setDarkMode] = useLocaleStorage('darkMode', false),
      [taskModal, setTaskModal] = useValue(false),
      [tabsStorage, setDataInStorage] = useLocaleStorage('data', defaultItems),
      [tabItems, setTabItem] = useValue(tabsStorage.length ? tabsStorage : defaultItems),
      [tab, setTab] = useValue(tabItems[0].title),
      [category, setCategory, categorySelectOnChange] = useValue(defaultItems[0].title)

    useEffect(() => {
      setDataInStorage(tabItems)
    }, [tabItems])

    const taskMethods = {
      createTask: (inputValue, setInputValue) => {
        setInputValue('')
        setTaskModal(false)
        setTab(category)

        tabItems.forEach(tab => {
          if (tab.title === category) {
            tab.data = [
              {
                task: inputValue,
                date: {
                  time: new Date().toLocaleTimeString(),
                  dmy: new Date().toLocaleDateString(),
                },
                completed: false,
              },
              ...tab.data,
            ]
          }
        })

        return setTabItem([...tabItems])
      },

      deleteTask: (title, currentTask) => {
        tabItems.forEach(tab => {
          if (title === tab.title) {
            tab.data = tab.data.filter(task => task.date.time !== currentTask.date.time)
          }
        })

        return setTabItem([...tabItems])
      },

      checkTask: (title, currentTask, complete) => {
        tabItems.forEach(tab => {
          if (title === tab.title) {
            tab.data.forEach(task => {
              if (currentTask.date.time === task.date.time) task.completed = !complete
            })
          }
        })

        return setTabItem([...tabItems])
      },

      editTask: (event, title, currentTask, newValue) => {
        event.target.style.borderBottom = `1px solid ${
          event.target.value ? 'transparent' : 'red'
        }`
        event.target.readOnly = event.code === 'Enter' && event.target.value

        tabItems.forEach(tab => {
          if (title === tab.title) {
            tab.data.forEach(task => {
              if (currentTask.task === task.task) task.task = newValue
            })
          }
        })

        return setTabItem([...tabItems])
      },

      setSortType: value => {
        tabItems.forEach(category => {
          if (category.title === tab) category.sortingType = value
        })

        return setTabItem([...tabItems])
      },
    }

    const value = {
      darkMode,
      setDarkMode,
      taskModal,
      setTaskModal,
      tab,
      setTab,
      tabItems,
      setTabItem,
      category,
      setCategory,
      categorySelectOnChange,
      ...taskMethods,
    }

    return (
      <Context.Provider value={value}>
        <Component darkMode={darkMode} />
      </Context.Provider>
    )
  }
}

export { withApp }
