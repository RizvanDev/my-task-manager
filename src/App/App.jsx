import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../Components/Layout/Layout'
import Main from '../Pages/main-page/Main'
import Profile from '../Pages/profile-page/Profile'
import { withApp } from '../hoc/withApp'
import './App.scss'

const App = ({ darkMode }) => {
  return (
    <Routes>
      <Route path='/' element={<Layout darkMode={darkMode} />}>
        <Route index element={<Main />} />
        <Route path='Profile.jsx' element={<Profile darkMode={darkMode} />} />
      </Route>
    </Routes>
  )
}

export default withApp(App)
