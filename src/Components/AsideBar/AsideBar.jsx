import React from 'react'
import './asideBar.scss'
import Logo from './Logo/Logo'
import CategoryList from './CategoryList/CategoryList'
import Info from './Info/Info'
import LogOut from '../UI/LogOut/LogOut'

const AsideBar = props => {
  const logOutStyles = {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    fontSize: '16px',
    lineHeight: '22px',
  }

  return (
    <aside className={props.darkMode ? 'asideBar darkMode' : 'asideBar'}>
      <Logo />
      <CategoryList
        tabItems={props.tabItems}
        setTabItem={props.setTabItem}
        tab={props.tab}
        setTab={props.setTab}
        showingTab={props.showingTab}
        setCategory={props.setCategory}
      />
      <Info darkMode={props.darkMode} />
      <LogOut style={logOutStyles} darkMode={props.darkMode} />
    </aside>
  )
}

export default AsideBar
