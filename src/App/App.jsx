import React, { useState } from 'react'
import './App.scss'
import AsideBar from '../AsideBar/AsideBar'
import MainContent from '../MainContent/MainContent'

const App = () => {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={darkMode ? 'App darkMode' : 'App'}>
      <div className='app__container'>
        <AsideBar darkMode={darkMode} />
        <MainContent darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  )
}

export default App
