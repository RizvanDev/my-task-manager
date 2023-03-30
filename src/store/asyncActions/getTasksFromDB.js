import { readFromDatabase } from '../../firebase/firebaseConfig'

export const getTasksFromDB = (userId, action) => {
  return async dispatch => {
    if (userId) {
      try {
        const path = `users/${userId}/user_tasks/`
        const snapshot = await readFromDatabase(path)

        return snapshot.exists() && dispatch(action(snapshot.val()))
      } catch (error) {
        console.log(`Error getting tasks - ${error}`)
        return null
      }
    }
  }
}
