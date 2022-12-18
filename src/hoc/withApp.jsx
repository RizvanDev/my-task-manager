import { authentication, database } from '../firebase/firebaseConfig'
import useValue from '../hooks/useValue'
import useLocaleStorage from '../hooks/useLocaleStorage'
import { useEffect } from 'react'
import { Context } from '../context'

const defaultPhoto =
  'https://w7.pngwing.com/pngs/7/618/png-transparent-man-illustration-avatar-icon-fashion-men-avatar-face-fashion-girl-heroes-thumbnail.png'

let defaultItems = [
  { title: 'Home', sortingType: 'newest first', data: [] },
  { title: 'Work', sortingType: 'newest first', data: [] },
  { title: 'Sport', sortingType: 'newest first', data: [] },
]

const withApp = Component => {
  return () => {
    // page mode
    const [darkMode, setDarkMode] = useLocaleStorage('darkMode', false)
    // modal windows
    const [authModal, setAuthModal] = useValue(false)
    const [taskModal, setTaskModal] = useValue(false)
    const [calendarModal, setCalendarModal] = useValue(false)
    // data
    const [tabsStorage, setDataInStorage] = useLocaleStorage('data', [])
    const [tabItems, setTabItem] = useValue(tabsStorage)
    // select tabs and category
    const [tab, setTab] = useValue(tabItems.length && tabItems[0].title)
    const [category, setCategory, categorySelectOnChange] = useValue(
      tabItems.length && tabItems[0].title,
    )
    // user information
    const [authorization, setAuthorization] = useValue(false)
    const [userId, setUserId] = useValue('')
    const [userInfo, setUserInfo] = useLocaleStorage('userInfo', {
      photo: defaultPhoto,
      nick: 'username',
      email: '',
    })

    console.log(tab, category)

    useEffect(() => {
      setDataInStorage(tabItems)
      database.writeUserData(userId, userInfo, tabItems)
    }, [tabItems])

    useEffect(() => {
      authentication.monitorAuthState(
        setAuthorization,
        defaultPhoto,
        userInfo,
        setUserInfo,
        setUserId,
        setTabItem,
        setTab,
        defaultItems,
      )
    }, [authorization])

    const setSortType = value => {
      tabItems.forEach(category => {
        if (category.title === tab) {
          category.sortingType = value

          category.data.sort((a, b) => {
            const first = a.time.split(':').join('')
            const second = b.time.split(':').join('')

            return category.sortingType === 'newest first'
              ? second - first
              : first - second
          })
        }
      })

      return setTabItem([...tabItems])
    }

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
                time: new Date().toLocaleTimeString(),
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
            tab.data = tab.data.filter(task => task.time !== currentTask.time)
          }
        })

        return setTabItem([...tabItems])
      },

      checkTask: (title, currentTask, complete) => {
        tabItems.forEach(tab => {
          if (title === tab.title) {
            tab.data.forEach(task => {
              if (currentTask.time === task.time) task.completed = !complete
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
    }

    const contextValues = {
      darkMode,
      setDarkMode,
      taskModal,
      setTaskModal,
      authModal,
      setAuthModal,
      calendarModal,
      setCalendarModal,
      authorization,
      setAuthorization,
      userId,
      userInfo,
      setUserInfo,
      tab,
      setTab,
      tabItems,
      setTabItem,
      defaultItems,
      category,
      setCategory,
      categorySelectOnChange,
      setSortType,
      ...taskMethods,
    }

    return (
      <Context.Provider value={contextValues}>
        <Component darkMode={darkMode} />
      </Context.Provider>
    )
  }
}

export { withApp }
