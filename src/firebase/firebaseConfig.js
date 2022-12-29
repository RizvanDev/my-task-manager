import { initializeApp } from 'firebase/app'

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { getDatabase, ref, set, update, get } from 'firebase/database'

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
  if (data) {
    for (const obj of data) {
      if (!obj.hasOwnProperty('data')) obj.data = []
    }

    return data
  }

  return []
}

// database
const database = {
  // send user information (email,avatar,nickname,id)
  writeUserInfoData: userInfo => {
    const reference = ref(db, `users/${userInfo.uid}/user_info`)

    if (userInfo.uid) {
      return set(reference, {
        uid: userInfo.uid,
        username: userInfo.nick,
        email: userInfo.email,
        avatar: userInfo.photo,
      })
    }
  },
  // send user tasks Data
  writeUserTasksData: (userId, date, tabItems) => {
    const reference = ref(db, `users/${userId}/user_tasks/${date}`)

    if (userId) {
      return set(reference, { ...tabItems })
    }
  },
  // create new data for the day
  writeNewDayData: (userId, date, defaultItems, setTabItem, setCategory, setTab) => {
    const distanceRef = ref(db, `users/${userId}/user_tasks/${date}`)

    return get(distanceRef).then(snapshot => {
      if (snapshot.exists()) {
        const tasks = snapshot.val()
        setCategory(tasks[0].title)
        setTab(tasks[0].title)
        return setTabItem([...addEmptyArrays(tasks)])
      }

      const reference = ref(db, `users/${userId}/user_tasks/`)
      setTabItem(defaultItems)
      setCategory(defaultItems[0].title)
      setTab(defaultItems[0].title)
      return update(reference, { [date]: defaultItems })
    })
  },
  // create Data for new user
  createUserData: (userId, userInfo, tabItems) => {
    const reference = ref(db, `users/${userId}`)
    const day = new Date().toLocaleDateString().split('.').join('')

    if (userId) {
      return set(reference, {
        user_info: {
          uid: userInfo.uid,
          username: userInfo.nick,
          email: userInfo.email,
          avatar: userInfo.photo,
        },
        user_tasks: { [day]: tabItems },
      })
    }
  },
  // reade user Data
  readUserData: (userId, setUserInfo, setTabItem, setTab, setCategory) => {
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

        setTabItem([...addEmptyArrays(condition ? data.user_tasks[date] : [])])
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
          params.setTabItem([...addEmptyArrays(tasks)])
          params.setCategory(tasks[0].title)
          params.setTab(tasks[0].title)
          params.setCalendarModal(false)
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
            params.setTabItem,
            params.setTab,
            params.setCategory,
          )

          setTimeout(() => params.setAuthModal(false), 1500)
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
            params.setAuthModal(false)
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
      params.setTabItem([...params.defaultItems])
      params.setTab(params.defaultItems[0].title)
      params.setCategory(params.defaultItems[0].title)
    })
  },
}

export { authentication, database }
