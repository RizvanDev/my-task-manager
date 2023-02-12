import { initializeApp } from 'firebase/app'

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { getDatabase, ref, set, get } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)

const addEmptyArrays = data => {
  return Array.isArray(data)
    ? data.map(obj => (obj.hasOwnProperty('data') ? obj : { ...obj, data: [] }))
    : data
}

// database
const database = {
  // send user information (email,avatar,nickname,id)
  writeUserInfoData: userInfo => {
    const reference = ref(db, `users/${userInfo.uid}/user_info`)

    const data = {
      uid: userInfo.uid,
      username: userInfo.nick,
      email: userInfo.email,
      avatar: userInfo.photo,
    }

    return userInfo.uid && set(reference, data)
  },
  // send user tasks Data
  writeUserTasksData: (userId, date, tabItems) => {
    const reference = ref(db, `users/${userId}/user_tasks/${date}`)

    return userId && set(reference, { ...tabItems.tasks })
  },
  // create/read new day
  writeNewDayData: (userId, date, setTabItem, setCategory, setTab) => {
    const distanceRef = ref(db, `users/${userId}/user_tasks/${date}`)

    return get(distanceRef).then(snapshot => {
      if (snapshot.exists()) {
        const tasks = snapshot.val()

        setCategory(tasks[0].title)
        setTab(tasks[0].title)
        setTabItem({
          date: new Date().toLocaleDateString().split('.').reverse().join(''),
          tasks: [...addEmptyArrays(tasks)],
        })
      } else {
        setTabItem({
          date: new Date().toLocaleDateString().split('.').reverse().join(''),
          tasks: [],
        })
      }
    })
  },
  // create Data for new user
  createUserData: (userId, userInfo, tabItems) => {
    const reference = ref(db, `users/${userId}`)
    const day = new Date().toLocaleDateString().split('.').join('')

    const data = {
      user_info: {
        uid: userInfo.uid,
        username: userInfo.nick,
        email: userInfo.email,
        avatar: userInfo.photo,
      },
      user_tasks: { [day]: tabItems.tasks },
    }

    return userId && set(reference, data)
  },
  // reade user Data
  readUserData: (userId, setUserInfo, tabItems, setTabItem, setTab, setCategory) => {
    const distanceRef = ref(db, `users/${userId}/`)
    const date = new Date().toLocaleDateString().split('.').join('')

    return get(distanceRef).then(snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val()

        setUserInfo({
          photo: data.user_info.avatar,
          nick: data.user_info.username,
          email: data.user_info.email,
          uid: data.user_info.uid,
        })

        const condition = data.user_tasks && data.user_tasks[date]

        setTabItem({
          ...tabItems,
          tasks: [...addEmptyArrays(condition ? data.user_tasks[date] : [])],
        })
        setCategory(condition ? data.user_tasks[date][0].title : '')
        setTab(condition ? data.user_tasks[date][0].title : '')
      }
    })
  },
  // reading the data of the selected day
  readPastData: ({ ...params }) => {
    const date = params.date.toLocaleDateString().split('.').join('')
    const distanceRef = ref(db, `users/${params.userInfo.uid}/user_tasks/${date}`)

    return get(distanceRef).then(snapshot => {
      if (snapshot.exists()) {
        const tasks = snapshot.val()
        params.setCalendarDate(params.date)
        setTimeout(() => {
          params.setTabItem({ ...params.tabItems, tasks: [...addEmptyArrays(tasks)] })
          params.setCategory(tasks[0].title)
          params.setTab(tasks[0].title)
          params.openModals({ ...params.modals, calendarModal: false })
        }, 500)
        return
      }

      return params.createAuthInfoModal({
        show: true,
        type: 'Error',
        text: `You don't have any tasks for this day`,
      })
    })
  },
  // Statistics
  createStatistics: (userId, period, setStatistics) => {
    const distanceRef = ref(db, `users/${userId}/user_tasks/`)
    const date = new Date().toLocaleDateString().split('.').join('')

    let categories = 0
    let createdTasks = 0
    let completedTasks = 0

    const calculateTasks = data => {
      return data.forEach(category => {
        if (category.hasOwnProperty('data')) {
          createdTasks += category.data.length

          category.data.forEach(task => task.completed && completedTasks++)
        }
      })
    }

    const periods = {
      Day: () => {
        const distanceRefDay = ref(db, `users/${userId}/user_tasks/${date}`)

        return get(distanceRefDay).then(snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.val()

            categories += data.length

            calculateTasks(data)

            setStatistics({
              Categories: categories,
              Created: createdTasks,
              Completed: completedTasks,
            })
          } else {
            setStatistics({
              Categories: '--',
              Created: '--',
              Completed: '--',
            })
          }
        })
      },
      Month: () => {
        const currentMonth = date.split('').splice(2, 2).join('')

        return get(distanceRef).then(snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.val()

            for (const day in data) {
              const condition = day.split('').splice(2, 2).join('') === currentMonth

              if (condition) {
                categories += data[day].length
                calculateTasks(data[day])
              }
            }

            setStatistics({
              Categories: categories,
              Created: createdTasks,
              Completed: completedTasks,
            })
          }
        })
      },
      Year: () => {
        const currentYear = date.split('').splice(4).join('')

        return get(distanceRef).then(snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.val()

            for (const day in data) {
              const condition = day.split('').splice(4).join('') === currentYear

              if (condition) {
                categories += data[day].length
                calculateTasks(data[day])
              }
            }

            setStatistics({
              Categories: categories,
              Created: createdTasks,
              Completed: completedTasks,
            })
          }
        })
      },
    }

    return periods[period]()
  },
}

// Authentication methods
const authentication = {
  // Login
  loginEmailPassword: async ({ ...params }) => {
    if (params.login.Password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          params.login.Email,
          params.login.Password,
        )

        if (userCredential) {
          params.setAuthorization(true)
          params.setLogin({ Email: '', Password: '' })
          params.createAuthInfoModal({
            show: true,
            type: 'Success',
            text: 'Authorization successfully',
          })

          params.setUserInfo({
            ...params.userInfo,
            uid: userCredential.user.uid,
          })

          database.readUserData(
            userCredential.user.uid,
            params.setUserInfo,
            params.tabItems,
            params.setTabItem,
            params.setTab,
            params.setCategory,
          )

          setTimeout(() => {
            params.openModals({ ...params.modals, authModal: false })
          }, 1500)
        }
      } catch (Error) {
        params.createAuthInfoModal({ show: true, type: 'Error', text: Error.code })
      }
    }
  },
  // Registration
  registrationEmailPassword: async ({ ...params }) => {
    if (params.registration.Password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          params.registration.Email,
          params.registration.Password,
        )

        if (userCredential) {
          params.setAuthorization(true)
          params.setRegistration({ Email: '', Password: '' })
          params.createAuthInfoModal({
            modal: true,
            type: 'Success',
            text: 'Registration successfully',
          })

          params.setUserInfo({
            ...params.userInfo,
            email: userCredential.user.email,
            uid: userCredential.user.uid,
          })

          database.createUserData(
            userCredential.user.uid,
            params.userInfo,
            params.tabItems,
          )

          setTimeout(() => {
            params.openModals({ ...params.modals, authModal: false })
            params.navigate('Profile.jsx')
          }, 1000)
        }
      } catch (Error) {
        console.log(Error)
        params.createAuthInfoModal({ modal: true, type: 'Error', text: Error.code })
      }
    }
  },
  // Logout
  logOut: ({ ...params }) => {
    return signOut(auth).then(() => {
      params.setAuthorization(false)
      params.setUserInfo({
        photo: params.defaultPhoto,
        nick: 'username',
        email: '',
        uid: '',
      })
      params.setCalendarDate(new Date())
      params.setTimeLine({ past: false, future: false })
      params.setTabItem({ ...params.tabItems, tasks: [] })
    })
  },
}

export { authentication, database }
