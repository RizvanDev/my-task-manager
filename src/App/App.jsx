import { Route, Routes } from 'react-router-dom'
import Layout from '../Components/Layout/Layout'
import Auth from '../Components/Pages/auth-page/Auth'
import Main from '../Components/Pages/main-page/Main'
import Profile from '../Components/Pages/profile-page/Profile'
import { withApp } from '../hoc/withApp'
import './App.scss'

const App = ({ darkMode, uid }) => {
	return (
		<>
			<Routes>
				{uid ? (
					<Route path='/' element={<Layout darkMode={darkMode} />}>
						<Route index element={<Main />} />
						<Route
							path='Profile.jsx'
							element={<Profile darkMode={darkMode} />}
						/>
					</Route>
				) : (
					<Route path='/' element={<Auth />} />
				)}
			</Routes>
		</>
	)
}

export default withApp(App)
