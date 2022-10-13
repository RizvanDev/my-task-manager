import React from 'react'
import './asideBar.scss'
import Logo from './Logo/Logo'
import CategoryList from './CategoryList/CategoryList'
import Info from './Info/Info'
import LogOut from '../UI/LogOut/LogOut'

const AsideBar = ({ darkMode, listItems, setListItem, tab, setTab }) => {
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
      <CategoryList listItems={listItems} setListItem={setListItem} tab={tab} setTab={setTab} />
      <Info darkMode={darkMode} />
      <LogOut style={logOutStyles} darkMode={darkMode} />
    </aside>
  )
}

export default AsideBar
