import { useContext, useEffect, useRef } from 'react'
import { Context } from '../../../context'
import Logo from './Logo/Logo'
import CategoryList from './CategoryList/CategoryList'
import Info from './Info/Info'
import LogOut from '../../../Components/UI/LogOut/LogOut'
import MainBtn from '../../UI/MainBtn/MainBtn'
import './asideBar.scss'

const AsideBar = ({ darkMode }) => {
  const { sideMenu, openSideMenu, userInfo } = useContext(Context)
  const ref = useRef(null)

  const handleClickOutside = e => !ref.current.contains(e.target) && openSideMenu(false)

  useEffect(() => {
    if (window.matchMedia('(max-width: 1280px)').matches) {
      document.addEventListener('click', handleClickOutside, { passive: true })
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const sideMenuCl = ['asideBar']

  darkMode && sideMenuCl.push('darkMode')
  sideMenu && sideMenuCl.push('open')

  const conditionLogOut = userInfo.uid && window.matchMedia('(min-width: 768px)').matches

  return (
    <aside className={sideMenuCl.join(' ')} ref={ref}>
      <div className='asideBar__container'>
        <Logo />
        <CategoryList />
        <Info darkMode={darkMode} />
        {conditionLogOut && (
          <div className='asideBar__logOut'>
            <LogOut />
          </div>
        )}
        {window.matchMedia('(max-width: 1280px)').matches && (
          <MainBtn className='asideBar__menu' type='button' onClick={() => openSideMenu(!sideMenu)}>
            <span className='asideBar__menu-item'></span>
          </MainBtn>
        )}
      </div>
    </aside>
  )
}

export default AsideBar
