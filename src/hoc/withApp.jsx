import useValue from '../hooks/useValue'

const defaultItems = [
  { title: 'Home', data: [] },
  { title: 'Work', data: [] },
  { title: 'Sport', data: [] },
]

const withApp = Component => {
  return () => {
    const [darkMode, setDarkMode] = useValue(true),
      [taskModal, setTaskModal] = useValue(false),
      [tabItems, setTabItem] = useValue(defaultItems),
      [tab, setTab] = useValue(defaultItems[0].title),
      [category, setCategory, selectOnChange] = useValue(defaultItems[0].title)

    const tasksMethods = {
      createTask: (inputValue, setInputValue) => {
        setInputValue('')
        setTaskModal(false)
        setTab(category)

        tabItems.forEach(tab => {
          if (tab.title === category) {
            tab.data = [...tab.data, { task: inputValue, date: new Date(), completed: false }]
          }
        })

        return setTabItem([...tabItems])
      },

      deleteTask: (title, currentTask) => {
        tabItems.forEach(tab => {
          if (title === tab.title) {
            tab.data = tab.data.filter(task => task.task !== currentTask.task)
          }
        })

        return setTabItem([...tabItems])
      },

      checkTask: (title, currentTask, complete) => {
        tabItems.forEach(tab => {
          if (title === tab.title) {
            tab.data.forEach(task => {
              if (currentTask.task === task.task) task.completed = !complete
            })
          }
        })

        return setTabItem(tabItems => [...tabItems])
      },

      editTask: (event, title, currentTask, newValue) => {
        event.target.style.borderBottom = `1px solid ${event.target.value ? 'transparent' : 'red'}`
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
        {...tasksMethods}
      />
    )
  }
}

export { withApp }
