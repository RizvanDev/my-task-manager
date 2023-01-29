import { useEffect } from 'react'
import { Context } from '../context'
import { database } from '../firebase/firebaseConfig'
import useValue from '../hooks/useValue'
import useLocaleStorage from '../hooks/useLocaleStorage'

const defaultPhoto =
  'https://w7.pngwing.com/pngs/7/618/png-transparent-man-illustration-avatar-icon-fashion-men-avatar-face-fashion-girl-heroes-thumbnail.png'

const withApp = Component => {
  return () => {
    // dark mode
    const [darkMode, setDarkMode] = useLocaleStorage('darkMode', false)
    // side menu viewport < 1280
    const [sideMenu, openSideMenu] = useValue(false)
    // modal windows
    const [modals, openModals] = useValue({
      authModal: false,
      taskModal: false,
      calendarModal: false,
      statisticsModal: false,
      compareModal: false,
    })
    const [authInfoModal, createAuthInfoModal] = useValue({
      show: false,
      type: '',
      text: '',
    })
    // date
    const [calendarDate, setCalendarDate] = useValue(new Date())
    const [timeLine, setTimeLine] = useValue({ past: false, future: false })
    // user information
    const [authorization, setAuthorization] = useLocaleStorage('auth', false)
    const [userInfo, setUserInfo] = useLocaleStorage('userInfo', {
      photo: defaultPhoto,
      nick: 'username',
      email: '',
      uid: '',
    })
    // data
    const [tabsStorage, setDataInStorage] = useLocaleStorage('data', {
      date: new Date().toLocaleDateString().split('.').reverse().join(''),
      tasks: [],
    })
    const [tabItems, setTabItem] = useValue(tabsStorage)
    // select tabs and category
    const [tab, setTab] = useValue(tabItems.tasks.length && tabItems.tasks[0].title)
    const [category, setCategory, categorySelectOnChange] = useValue(
      tabItems.tasks.length && tabItems.tasks[0].title,
    )

    useEffect(() => {
      const date = new Date().toLocaleDateString().split('.').reverse().join('')

      if (authorization && date !== tabItems.date) {
        database.writeNewDayData(
          userInfo.uid,
          calendarDate.toLocaleDateString().split('.').join(''),
          setTabItem,
          setCategory,
          setTab,
        )
      }
    }, [])

    useEffect(() => {
      timeLine.past === timeLine.future && setDataInStorage(tabItems)
    }, [tabItems])

    // select calendar value
    const selectData = date => {
      const selectedDate = +date.toLocaleDateString().split('.').reverse().join('')
      const present = +new Date().toLocaleDateString().split('.').reverse().join('')

      if (selectedDate < present) {
        setTimeLine({ past: selectedDate < present, future: selectedDate > present })
        return database.readPastData({
          userInfo,
          date,
          tabItems,
          setTabItem,
          setCategory,
          setTab,
          modals,
          openModals,
          setCalendarDate,
          createAuthInfoModal,
        })
      } else if (selectedDate > present) {
        setTimeLine({ past: selectedDate < present, future: selectedDate > present })
        setCalendarDate(date)
        openModals({ ...modals, calendarModal: false })
        return database.writeNewDayData(
          userInfo.uid,
          date.toLocaleDateString().split('.').join(''),
          setTabItem,
          setCategory,
          setTab,
        )
      }

      setTimeLine({ past: false, future: false })
      setCalendarDate(date)
      setTabItem(tabsStorage)
      setCategory(tabsStorage.tasks.length && tabsStorage.tasks[0].title)
      setTab(tabsStorage.tasks.length && tabsStorage.tasks[0].title)
      openModals({ ...modals, calendarModal: false })
    }

    const tasksMethods = {
      createTask: (inputValue, setInputValue) => {
        setInputValue('')
        openModals({ ...modals, taskModal: false })
        setTab(category)

        tabItems.tasks.forEach(tab => {
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

        database.writeUserTasksData(
          userInfo.uid,
          calendarDate.toLocaleDateString().split('.').join(''),
          tabItems,
        )

        return setTabItem({ ...tabItems })
      },
      deleteTask: (title, currentTask) => {
        tabItems.tasks.forEach(tab => {
          if (title === tab.title) {
            tab.data = tab.data.filter(task => task.time !== currentTask.time)
          }
        })

        database.writeUserTasksData(
          userInfo.uid,
          calendarDate.toLocaleDateString().split('.').join(''),
          tabItems,
        )

        return setTabItem({ ...tabItems })
      },
      checkTask: (title, currentTask, complete) => {
        tabItems.tasks.forEach(tab => {
          if (title === tab.title) {
            tab.data.forEach(task => {
              if (currentTask.time === task.time) task.completed = !complete
            })
          }
        })

        database.writeUserTasksData(
          userInfo.uid,
          calendarDate.toLocaleDateString().split('.').join(''),
          tabItems,
        )

        return setTabItem({ ...tabItems })
      },
      editTask: (event, title, currentTask, newValue) => {
        event.target.style.borderBottom = `1px solid ${
          event.target.value ? 'transparent' : 'red'
        }`
        event.target.readOnly = event.code === 'Enter' && event.target.value

        tabItems.tasks.forEach(tab => {
          if (title === tab.title) {
            tab.data.forEach(task => {
              if (currentTask.task === task.task) task.task = newValue
            })
          }
        })

        database.writeUserTasksData(
          userInfo.uid,
          calendarDate.toLocaleDateString().split('.').join(''),
          tabItems,
        )

        return setTabItem({ ...tabItems })
      },
      setSortType: value => {
        tabItems.tasks.forEach(category => {
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

        database.writeUserTasksData(
          userInfo.uid,
          calendarDate.toLocaleDateString().split('.').join(''),
          tabItems,
        )

        return setTabItem({ ...tabItems })
      },
    }

    // global context
    const contextValues = {
      darkMode,
      setDarkMode,
      modals,
      openModals,
      authInfoModal,
      createAuthInfoModal,
      sideMenu,
      openSideMenu,
      calendarDate,
      setCalendarDate,
      timeLine,
      setTimeLine,
      selectData,
      setDataInStorage,
      authorization,
      setAuthorization,
      userInfo,
      setUserInfo,
      tab,
      setTab,
      tabItems,
      setTabItem,
      defaultPhoto,
      category,
      setCategory,
      categorySelectOnChange,
      ...tasksMethods,
    }

    return (
      <Context.Provider value={contextValues}>
        <Component darkMode={darkMode} />
      </Context.Provider>
    )
  }
}

export { withApp }
