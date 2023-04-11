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

    return await writeToDataBase(path, data)
  },
  // send user tasks Data
  writeUserTasksData: async (userId, date, updatedTabItems) => {
    const path = `users/${userId}/user_tasks/${date}`
    return await writeToDataBase(path, { ...updatedTabItems })
  },
  // create/read new day
  writeNewDayData: async (userId, date, setTabItems, setCategory, setTab) => {
    const path = `users/${userId}/user_tasks/${date}`
    const snapshot = await readFromDatabase(path)

    const dataTabItems = {
      date: new Date().toLocaleDateString().split('.').reverse().join(''),
      tabs: [],
    }

    if (snapshot.exists()) {
      const data = snapshot.val()

      setCategory(data[0].title)
      setTab(data[0].title)
      dataTabItems.tabs = addEmptyArrays(data)
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
      user_tasks: { [day]: tabItems.tabs },
    }

    return await writeToDataBase(path, data)
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
        tabs: {
          ...tabItems,
          tabs: addEmptyArrays(condition ? data.user_tasks[date] : []),
        },
      }

      setUserInfo(userData.info)
      setTabItems(userData.tabs)
      setCategory(condition ? data.user_tasks[date][0].title : '')
      setTab(condition ? data.user_tasks[date][0].title : '')
    }
  },
  // reading the data of the selected day
  readPastData: async params => {
    const {
      date,
      userInfo,
      setCalendarDate,
      setCategory,
      setTab,
      tabItems,
      setTabItems,
      modals,
      openModals,
      createAuthInfoModal,
    } = params

    const pastDate = date.toLocaleDateString().replaceAll('.', '')
    const path = `users/${userInfo.uid}/user_tasks/${pastDate}`
    const snapshot = await readFromDatabase(path)

    if (snapshot.exists()) {
      const tasks = snapshot.val()

      setCalendarDate(date)
      setCategory(tasks[0].title)
      setTab(tasks[0].title)
      setTabItems({ ...tabItems, tabs: addEmptyArrays(tasks) })
      openModals({ ...modals, calendarModal: false })
    } else {
      createAuthInfoModal({
        show: true,
        type: 'Error',
        text: `You don't have any tasks for this day`,
      })
    }
  },
}

// Authentication methods
const authentication = {
  // Login
  loginEmailPassword: async params => {
    const {
      login,
      setLogin,
      createAuthInfoModal,
      userInfo,
      setUserInfo,
      tabItems,
      setTabItems,
      setTab,
      setCategory,
      modals,
      openModals,
    } = params

    if (login.Password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, login.Email, login.Password)

        if (userCredential) {
          setLogin({ Email: '', Password: '' })
          createAuthInfoModal({
            show: true,
            type: 'Success',
            text: 'Authorization successfully',
          })

          setUserInfo({
            ...userInfo,
            uid: userCredential.user.uid,
          })

          database.readUserData(
            userCredential.user.uid,
            setUserInfo,
            tabItems,
            setTabItems,
            setTab,
            setCategory,
          )

          setTimeout(() => openModals({ ...modals, authModal: false }), 1500)
        }
      } catch (Error) {
        createAuthInfoModal({
          show: true,
          type: 'Error',
          text: Error.code.substring(5).replaceAll('-', ' '),
        })
      }
    }
  },
  // Registration
  registrationEmailPassword: async params => {
    const {
      registration,
      setRegistration,
      navigate,
      createAuthInfoModal,
      userInfo,
      setUserInfo,
      tabItems,
      modals,
      openModals,
    } = params

    if (registration.Password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          registration.Email,
          registration.Password,
        )

        if (userCredential) {
          setRegistration({ Email: '', Password: '' })
          createAuthInfoModal({
            show: true,
            type: 'Success',
            text: 'Registration successfully',
          })

          setUserInfo({
            ...userInfo,
            email: userCredential.user.email,
            uid: userCredential.user.uid,
          })

          database.createUserData(userCredential.user.uid, userInfo, tabItems)

          setTimeout(() => {
            openModals({ ...modals, authModal: false })
            navigate('Profile.jsx')
          }, 1000)
        }
      } catch (Error) {
        createAuthInfoModal({
          show: true,
          type: 'Error',
          text: Error.code.substring(5).replaceAll('-', ' '),
        })
      }
    }
  },
  // Logout
  logOut: async params => {
    const { defaultPhoto, setCalendarDate, setTimeLine, setUserInfo, tabItems, setTabItems } =
      params

    const userData = {
      info: {
        photo: defaultPhoto,
        nick: 'username',
        email: '',
        uid: '',
      },
      tabs: { ...tabItems, tabs: [] },
    }

    setCalendarDate(new Date())
    setTimeLine({ past: false, future: false })
    setUserInfo(userData.info)
    setTabItems(userData.tabs)

    return await signOut(auth)
  },
}

export { authentication, database, readFromDatabase }
