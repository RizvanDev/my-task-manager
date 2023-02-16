import { Outlet } from 'react-router-dom'
import AsideBar from './AsideBar/AsideBar'

const Layout = ({ darkMode }) => {
  return (
    <div className={darkMode ? 'App darkMode' : 'App'}>
      <div className='app__container'>
        <AsideBar darkMode={darkMode} />
        <div className='outlet'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
