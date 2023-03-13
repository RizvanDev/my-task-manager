import { useEffect } from 'react'
import { Context } from '../context'
import { database } from '../firebase/firebaseConfig'
import useValue from '../hooks/useValue'
import useLocaleStorage from '../hooks/useLocaleStorage'
import defaultPhoto from '../assets/img/default-profile-picture.jpg'

const defaultChartData = [
  { day: 'Sun', created: 0, completed: 0 },
  { day: 'Mon', created: 0, completed: 0 },
  { day: 'Tue', created: 0, completed: 0 },
  { day: 'Wed', created: 0, completed: 0 },
  { day: 'Thu', created: 0, completed: 0 },
  { day: 'Fri', created: 0, completed: 0 },
  { day: 'Sat', created: 0, completed: 0 },
]

const withApp = Component => {
  return () => {
    // dark mode
    const [darkMode, setDarkMode] = useLocaleStorage('darkMode', false)
    // side menu viewport < 1280
    const [sideMenu, openSideMenu] = useValue(false)
    // container for adding categories
    const [containerAddCategory, showContainerAddCategory] = useValue(false)
    // modal windows
    const [modals, openModals] = useValue({
      authModal: false,
      taskModal: false,
      calendarModal: false,
      statisticsModal: false,
      deleteCategoryModal: false,
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
    const [userInfo, setUserInfo] = useLocaleStorage('userInfo', {
      photo: defaultPhoto,
      nick: 'username',
      email: '',
      uid: '',
    })
    // data
    const [tabsStorage, setDataInStorage] = useLocaleStorage('data', {
      date: new Date().toLocaleDateString().split('.').reverse().join(''),
      tabs: [],
    })
    const [tabItems, setTabItems] = useValue(tabsStorage)
    const [dataChart, setDataChart] = useValue(defaultChartData)

    // select tabs and category
    const [tab, setTab] = useValue(tabItems.tabs.length && tabItems.tabs[0].title)
    const [category, setCategory, categorySelectOnChange] = useValue(
      tabItems.tabs.length && tabItems.tabs[0].title,
    )

    useEffect(() => {
      const date = new Date().toLocaleDateString().split('.').reverse().join('')

      if (userInfo.uid && date !== tabItems.date) {
        database.writeNewDayData(
          userInfo.uid,
          calendarDate.toLocaleDateString().replaceAll('.', ''),
          setTabItems,
          setCategory,
          setTab,
        )
      }
    }, [])

    useEffect(() => {
      timeLine.past === timeLine.future && setDataInStorage(tabItems)
      userInfo.uid && database.getWeeklyTaskCompletionData(userInfo.uid, setDataChart)
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
          setTabItems,
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
          date.toLocaleDateString().replaceAll('.', ''),
          setTabItems,
          setCategory,
          setTab,
        )
      }

      setTimeLine({ past: false, future: false })
      setCalendarDate(date)
      setTabItems(tabsStorage)
      setCategory(tabsStorage.tabs.length && tabsStorage.tabs[0].title)
      setTab(tabsStorage.tabs.length && tabsStorage.tabs[0].title)
      openModals({ ...modals, calendarModal: false })
    }

    const tasksMethods = {
      createTask: (inputValue, setInputValue) => {
        setInputValue('')
        openModals({ ...modals, taskModal: false })
        setTab(category)

        const newTask = {
          task: inputValue,
          time: new Date().toLocaleTimeString(),
          completed: false,
        }

        const updatedTabItems = tabItems.tabs.map(tab => {
          return tab.title === category ? { ...tab, data: [...tab.data, newTask] } : tab
        })

        database.writeUserTasksData(
          userInfo.uid,
          calendarDate.toLocaleDateString().replaceAll('.', ''),
          updatedTabItems,
        )

        return setTabItems({ ...tabItems, tabs: updatedTabItems })
      },
      deleteTask: (title, currentTask) => {
        const filteredTasks = tasks => tasks.filter(task => task.time !== currentTask.time)

        const updatedTabItems = tabItems.tabs.map(tab => {
          return title === tab.title ? { ...tab, data: filteredTasks(tab.data) } : tab
        })

        database.writeUserTasksData(
          userInfo.uid,
          calendarDate.toLocaleDateString().replaceAll('.', ''),
          updatedTabItems,
        )

        return setTabItems({ ...tabItems, tabs: updatedTabItems })
      },
      completeTask: (title, currentTask, complete) => {
        const updatedTabItems = { ...tabItems }

        let updated = false

        for (const tab of updatedTabItems.tabs) {
          if (title === tab.title) {
            for (const task of tab.data) {
              if (currentTask.time === task.time) {
                task.completed = !complete
                updated = true
                break
              }
            }

            if (updated) break
          }
        }

        database.writeUserTasksData(
          userInfo.uid,
          calendarDate.toLocaleDateString().replaceAll('.', ''),
          updatedTabItems.tabs,
        )

        return setTabItems(updatedTabItems)
      },
      editTask: (e, title, currentTask, newValue) => {
        e.target.style.borderBottom = `1px solid ${e.target.value ? 'transparent' : 'red'}`
        e.target.readOnly = e.code === 'Enter' && e.target.value

        const updatedTabItems = { ...tabItems }

        let updated = false

        for (const tab of updatedTabItems.tabs) {
          if (title === tab.title) {
            for (const task of tab.data) {
              if (currentTask.time === task.time) {
                task.task = newValue
                updated = true
                break
              }
            }
            if (updated) break
          }
        }

        database.writeUserTasksData(
          userInfo.uid,
          calendarDate.toLocaleDateString().replaceAll('.', ''),
          updatedTabItems.tabs,
        )

        return setTabItems(updatedTabItems)
      },
      setSortType: value => {
        const updatedTabItems = { ...tabItems }

        updatedTabItems.tabs.forEach(category => {
          if (category.title === tab) {
            category.sortingType = value

            category.data.sort((a, b) => {
              const first = a.time.replaceAll(':', '')
              const second = b.time.replaceAll(':', '')

              return category.sortingType === 'newest first' ? second - first : first - second
            })
          }
        })

        database.writeUserTasksData(
          userInfo.uid,
          calendarDate.toLocaleDateString().replaceAll('.', ''),
          updatedTabItems.tabs,
        )

        return setTabItems({ ...updatedTabItems })
      },
    }

    // global context
    const contextValues = {
      darkMode,
      setDarkMode,
      containerAddCategory,
      showContainerAddCategory,
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
      userInfo,
      setUserInfo,
      tab,
      setTab,
      tabItems,
      setTabItems,
      dataChart,
      setDataChart,
      defaultPhoto,
      defaultChartData,
      category,
      setCategory,
      categorySelectOnChange,
      tasksMethods,
    }

    return (
      <Context.Provider value={contextValues}>
        <Component darkMode={darkMode} />
      </Context.Provider>
    )
  }
}

export { withApp }
