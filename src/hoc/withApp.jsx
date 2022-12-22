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
    const [authInfoModal, createAuthInfoModal] = useValue({
      show: false,
      type: '',
      text: '',
    })
    // data
    const [tabsStorage, setDataInStorage] = useLocaleStorage('data', [])
    const [tabItems, setTabItem] = useValue(tabsStorage)
    // select tabs and category
    const [tab, setTab] = useValue(tabItems.length && tabItems[0].title)
    const [category, setCategory, categorySelectOnChange] = useValue(
      tabItems.length && tabItems[0].title,
    )
    // date
    const [calendarDate, setCalendarDate] = useValue(new Date())
    const [pastTime, setPastTime] = useValue(false)
    // user information
    const [authorization, setAuthorization] = useValue(false)
    const [userInfo, setUserInfo] = useLocaleStorage('userInfo', {
      photo: defaultPhoto,
      nick: 'username',
      email: '',
      uid: '',
    })

    // auth
    useEffect(() => {
      authentication.monitorAuthState(setAuthorization)
    }, [authorization])
    //
    // set past time
    useEffect(() => {
      const calendar = +calendarDate.toLocaleDateString().split('.').join('')
      const now = +new Date().toLocaleDateString().split('.').join('')

      setPastTime(calendar < now)
    }, [calendarDate])
    // check data on server
    useEffect(() => {
      if (!pastTime) {
        setDataInStorage(tabItems)
        database.writeUserTasksData(
          userInfo.uid,
          new Date().toLocaleDateString().split('.').join(''),
          tabItems,
        )
      }
    }, [tabItems])

    const selectData = data => {
      const selectedData = +data.toLocaleDateString().split('.').join('')
      const present = +new Date().toLocaleDateString().split('.').join('')

      if (selectedData < present) {
        return database.readPastData({
          userInfo,
          data,
          setTabItem,
          setCategory,
          setTab,
          setCalendarModal,
          setCalendarDate,
          createAuthInfoModal,
          pastTime,
        })
      } else if (selectData > present) {
        console.log('this is Future...')
        return setCalendarModal(false)
      }

      setCalendarDate(data)
      setTabItem(tabsStorage)
      setCategory(tabsStorage[0].title)
      setTab(tabsStorage[0].title)
      return setCalendarModal(false)
    }

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

    // global context
    const contextValues = {
      darkMode,
      setDarkMode,
      taskModal,
      setTaskModal,
      authModal,
      setAuthModal,
      calendarModal,
      setCalendarModal,
      authInfoModal,
      createAuthInfoModal,
      calendarDate,
      setCalendarDate,
      pastTime,
      setPastTime,
      selectData,
      authorization,
      setAuthorization,
      userInfo,
      setUserInfo,
      tab,
      setTab,
      tabItems,
      setTabItem,
      defaultItems,
      defaultPhoto,
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
