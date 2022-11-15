import useValue from '../hooks/useValue'
import useLocaleStorage from '../hooks/useLocaleStorage'
import { useEffect } from 'react'

const defaultItems = [
  { title: 'Home', data: [] },
  { title: 'Work', data: [] },
  { title: 'Sport', data: [] },
]

const withApp = Component => {
  return () => {
    const [darkMode, setDarkMode] = useLocaleStorage('darkMode', false),
      [taskModal, setTaskModal] = useValue(false),
      [tabsStorage, setDataInStorage] = useLocaleStorage('data', defaultItems),
      [tabItems, setTabItem] = useValue(tabsStorage.length ? tabsStorage : defaultItems),
      [tab, setTab] = useValue(defaultItems[0].title),
      [category, setCategory, selectOnChange] = useValue(defaultItems[0].title)

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

        return setTabItem(tabItems => [...tabItems])
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

        return setTabItem(tabItems => [...tabItems])
      },
    }

    return (
      <Component
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        taskModal={taskModal}
        setTaskModal={setTaskModal}
        tab={tab}
        setTab={setTab}
        tabItems={tabItems}
        setTabItem={setTabItem}
        category={category}
        setCategory={setCategory}
        selectOnChange={selectOnChange}
        {...taskMethods}
      />
    )
  }
}

export { withApp }
