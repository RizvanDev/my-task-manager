import React, { useContext } from 'react'
import { Context } from '../../../context'
import Logo from './Logo/Logo'
import CategoryList from './CategoryList/CategoryList'
import Info from './Info/Info'
import LogOut from '../../../Components/UI/LogOut/LogOut'
import './asideBar.scss'

const AsideBar = ({ darkMode }) => {
  const { authorization } = useContext(Context)

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
      {authorization ? <LogOut style={logOutStyles} darkMode={darkMode} /> : ''}
    </aside>
  )
}

export default AsideBar
