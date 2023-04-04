import { readFromDatabase } from '../../firebase/firebaseConfig'

export const getTasksFromDB = (userId, action) => {
  return async dispatch => {
    if (userId) {
      try {
        const path = `users/${userId}/user_tasks/`
        const snapshot = await readFromDatabase(path)

        if (snapshot.exists()) {
          const tasks = snapshot.val()
          return dispatch(action(tasks))
        }
      } catch (error) {
        console.log(`Error getting tasks - ${error}`)
        return null
      }
    }
  }
}
