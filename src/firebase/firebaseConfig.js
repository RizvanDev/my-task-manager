import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { getDatabase, onValue, ref, set } from 'firebase/database'

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

const database = {
  writeUserData: (userId, userInfo, tabItems) => {
    const reference = ref(db, 'users/' + userId)
    if (userId) {
      set(reference, {
        username: userInfo.nick,
        email: userInfo.email,
        profile_picture: userInfo.photo,
        data: tabItems,
      })
    }
  },
  readUserData: (userId, setUserInfo, setTabItem, setTab) => {
    const distanceRef = ref(db, 'users/' + userId)

    onValue(distanceRef, snapshot => {
      const userData = snapshot.val()
      setUserInfo({
        photo: userData.profile_picture,
        nick: userData.username,
        email: userData.email,
      })

      setTabItem([...addEmptyArrays(userData.data)])
      setTab(userData.data ? userData.data[0].title : '')
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

        database.readUserData(
          userCredential.user.uid,
          params.setUserInfo,
          params.setTabItem,
          params.setTab,
        )

        params.setLogin({ Email: '', Password: '' })

        setTimeout(() => {
          params.setAuthModal(false)
        }, 1000)

        params.createAuthInfoModal({
          modal: true,
          type: 'Success',
          text: 'Authorization successfully',
        })
      } catch (Error) {
        console.log(Error)
        params.createAuthInfoModal({ modal: true, type: 'Error', text: Error.code })
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

        database.writeUserData(userCredential.user.uid, params.userInfo, params.tabItems)

        params.setRegistration({ Email: '', Password: '' })

        setTimeout(() => {
          params.setAuthModal(false)
          params.navigate('Profile.jsx')
        }, 1000)

        params.createAuthInfoModal({
          modal: true,
          type: 'Success',
          text: 'Registration successfully',
        })
      } catch (Error) {
        console.log(Error)
        params.createAuthInfoModal({ modal: true, type: 'Error', text: Error.code })
      }
    }
  },
  // State
  monitorAuthState: (
    setAuthorization,
    defaultPhoto,
    userInfo,
    setUserInfo,
    setUserId,
    setTabItem,
    setTab,
    defaultItems,
  ) => {
    return onAuthStateChanged(auth, user => {
      if (user) {
        setAuthorization(true)
        setUserId(user.uid)
        setUserInfo({ ...userInfo, email: user.email })
      } else {
        setAuthorization(false)
        setUserId('')
        setUserInfo({ photo: defaultPhoto, nick: 'username', email: '' })
        setTabItem([...defaultItems])
        setTab(defaultItems[0].title)
      }
    })
  },
  // Logout
  logOut: async () => await signOut(auth),
}

export { authentication, database }
