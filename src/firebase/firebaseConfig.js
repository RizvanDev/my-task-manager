import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, get } from 'firebase/database'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

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

/* 
 This is an auxiliary function that adds an empty array to the object for rendering,
 since empty arrays cannot be stored in the database.
*/
const addEmptyArrays = data => {
  return data.map(obj => (obj.hasOwnProperty('data') ? obj : { ...obj, data: [] }))
}
// Helper function for writing data in the database
const writeToDataBase = (path, data) => set(ref(db, path), data)
// Helper function for reading data from the database
const readFromDatabase = path => get(ref(db, path))

// database
const database = {
  // send user information (email,avatar,nickname,id)
  writeUserInfoData: async userInfo => {
    const path = `users/${userInfo.uid}/user_info`

    const data = {
      uid: userInfo.uid,
      username: userInfo.nick,
      email: userInfo.email,
      avatar: userInfo.photo,
    }

    return userInfo.uid && (await writeToDataBase(path, data))
  },
  // send user tasks Data
  writeUserTasksData: async (userId, date, tabItems) => {
    const path = `users/${userId}/user_tasks/${date}`
    return userId && (await writeToDataBase(path, { ...tabItems.tasks }))
  },
  // create/read new day
  writeNewDayData: async (userId, date, setTabItems, setCategory, setTab) => {
    const path = `users/${userId}/user_tasks/${date}`
    const snapshot = await readFromDatabase(path)

    const dataTabItems = {
      date: new Date().toLocaleDateString().split('.').reverse().join(''),
      tasks: [],
    }

    if (snapshot.exists()) {
      const tasks = snapshot.val()

      setCategory(tasks[0].title)
      setTab(tasks[0].title)
      dataTabItems.tasks = addEmptyArrays(tasks)
    }

    return setTabItems(dataTabItems)
  },
  // create Data for new user
  createUserData: async (userId, userInfo, tabItems) => {
    const day = new Date().toLocaleDateString().replaceAll('.', '')
    const path = `users/${userId}`

    const data = {
      user_info: {
        uid: userInfo.uid,
        username: userInfo.nick,
        email: userInfo.email,
        avatar: userInfo.photo,
      },
      user_tasks: { [day]: tabItems.tasks },
    }

    return userId && (await writeToDataBase(path, data))
  },
  // reade user Data
  readUserData: async (userId, setUserInfo, tabItems, setTabItems, setTab, setCategory) => {
    const date = new Date().toLocaleDateString().replaceAll('.', '')
    const path = `users/${userId}/`
    const snapshot = await readFromDatabase(path)

    if (snapshot.exists()) {
      const data = snapshot.val()

      const condition = data.user_tasks && data.user_tasks[date]

      const userData = {
        info: {
          photo: data.user_info.avatar,
          nick: data.user_info.username,
          email: data.user_info.email,
          uid: data.user_info.uid,
        },
        tasks: {
          ...tabItems,
          tasks: addEmptyArrays(condition ? data.user_tasks[date] : []),
        },
      }

      setUserInfo(userData.info)
      setTabItems(userData.tasks)
      setCategory(condition ? data.user_tasks[date][0].title : '')
      setTab(condition ? data.user_tasks[date][0].title : '')
    }
  },
  // reading the data of the selected day
  readPastData: async ({ ...params }) => {
    const date = params.date.toLocaleDateString().replaceAll('.', '')
    const path = `users/${params.userInfo.uid}/user_tasks/${date}`
    const snapshot = await readFromDatabase(path)

    if (snapshot.exists()) {
      const tasks = snapshot.val()

      params.setCalendarDate(params.date)
      params.setCategory(tasks[0].title)
      params.setTab(tasks[0].title)
      params.setTabItems({ ...params.tabItems, tasks: addEmptyArrays(tasks) })
      params.openModals({ ...params.modals, calendarModal: false })
    } else {
      params.createAuthInfoModal({
        show: true,
        type: 'Error',
        text: `You don't have any tasks for this day`,
      })
    }
  },
  // Statistics
  createStatistics: async (userId, period, setStatistics) => {
    const date = new Date().toLocaleDateString().replaceAll('.', '')
    const path = `users/${userId}/user_tasks/${period === 'Day' ? date : ''}`
    const snapshot = await readFromDatabase(path)

    const statistics = { Categories: 0, Created: 0, Completed: 0 }

    if (snapshot.exists()) {
      const data = snapshot.val()

      const updateStatistics = data => {
        data.forEach(category => {
          if (category.hasOwnProperty('data')) {
            statistics.Created += category.data.length
            statistics.Completed += category.data.filter(task => task.completed).length
          }
        })
      }

      const periods = {
        Day: () => {
          statistics.Categories = data.length
          updateStatistics(data)
        },
        Month: () => {
          const currentMonth = date.substring(2, 4)

          for (const day in data) {
            if (day.substring(2, 4) === currentMonth) {
              statistics.Categories += data[day].length
              updateStatistics(data[day])
            }
          }
        },
        Year: () => {
          const currentYear = date.substring(4)

          for (const day in data) {
            if (day.substring(4) === currentYear) {
              statistics.Categories += data[day].length
              updateStatistics(data[day])
            }
          }
        },
      }

      periods[period]()
    }

    return setStatistics(statistics)
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
            params.setTabItems,
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
          params.setRegistration({ Email: '', Password: '' })
          params.createAuthInfoModal({
            show: true,
            type: 'Success',
            text: 'Registration successfully',
          })

          params.setUserInfo({
            ...params.userInfo,
            email: userCredential.user.email,
            uid: userCredential.user.uid,
          })

          database.createUserData(userCredential.user.uid, params.userInfo, params.tabItems)

          setTimeout(() => {
            params.openModals({ ...params.modals, authModal: false })
            params.navigate('Profile.jsx')
          }, 1000)
        }
      } catch (Error) {
        params.createAuthInfoModal({ show: true, type: 'Error', text: Error.code })
      }
    }
  },
  // Logout
  logOut: async ({ ...params }) => {
    const userData = {
      info: {
        photo: params.defaultPhoto,
        nick: 'username',
        email: '',
        uid: '',
      },
      tasks: { ...params.tabItems, tasks: [] },
    }

    params.setCalendarDate(new Date())
    params.setTimeLine({ past: false, future: false })
    params.setUserInfo(userData.info)
    params.setTabItems(userData.tasks)

    return await signOut(auth)
  },
}

export { authentication, database }
