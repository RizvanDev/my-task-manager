import React from 'react'
import './asideBar.scss'
import Logo from './components/Logo/Logo'
import CategoryList from './components/CategoryList/CategoryList'
import Info from './components/Info/Info'
import LogOut from '../UI/LogOut/LogOut'

const AsideBar = () => {
  return (
    <aside className='asideBar'>
      <Logo />
      <CategoryList />
      <Info />
      <LogOut />
    </aside>
  )
}

export default AsideBar
