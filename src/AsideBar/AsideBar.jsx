import React from 'react'
import './asideBar.scss'
import Logo from './components/Logo/Logo'
import CategoryList from './components/CategoryList/CategoryList'
import Info from './components/Info/Info'
import LogOut from '../UI/LogOut/LogOut'

const AsideBar = ({ darkMode }) => {
  const logOutStyles = {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    fontSize: '16px',
    lineHeight: '22px',
  }

  return (
    <aside className={darkMode ? 'asideBar darkMode' : 'asideBar'}>
      <Logo />
      <CategoryList />
      <Info darkMode={darkMode} />
      <LogOut style={logOutStyles} darkMode={darkMode} />
    </aside>
  )
}

export default AsideBar
