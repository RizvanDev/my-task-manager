import { useContext, useEffect, useRef } from 'react'
import { Context } from '../../../context'
import Logo from './Logo/Logo'
import CategoryList from './CategoryList/CategoryList'
import Info from './Info/Info'
import LogOut from '../../../Components/UI/LogOut/LogOut'
import './asideBar.scss'

const AsideBar = ({ darkMode }) => {
  const { sideMenu, openSideMenu, authorization } = useContext(Context)
  const ref = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 1280) {
      const handleClick = e => !ref.current.contains(e.target) && openSideMenu(false)

      document.addEventListener('click', handleClick, { passive: true })

      return () => document.removeEventListener('click', handleClick)
    }
  }, [])

  const sideMenuCl = ['asideBar']

  darkMode && sideMenuCl.push('darkMode')
  sideMenu && sideMenuCl.push('open')

  const logOutStyles = {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    fontSize: '16px',
    lineHeight: '22px',
  }

  const conditionLogOut = authorization && window.matchMedia('(min-width: 768px)').matches

  if (window.matchMedia('(max-width:1400)').matches) {
    logOutStyles.fontSize = '14px'
    logOutStyles.lineHeight = '20px'
  }

  return (
    <aside className={sideMenuCl.join(' ')} ref={ref}>
      <div className='asideBar__container'>
        <Logo />
        <CategoryList />
        <Info darkMode={darkMode} />
        {conditionLogOut && <LogOut style={logOutStyles} darkMode={darkMode} />}
        {window.matchMedia('(max-width: 1280px)').matches && (
          <button
            type='button'
            className='asideBar__menu'
            onClick={() => openSideMenu(!sideMenu)}>
            <span className='asideBar__menu-item'></span>
          </button>
        )}
      </div>
    </aside>
  )
}

export default AsideBar
