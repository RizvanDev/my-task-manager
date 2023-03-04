import { useNavigate, useLocation } from 'react-router-dom'
import MainBtn from '../../../UI/MainBtn/MainBtn'
import './logo.scss'

const Logo = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = () => (location.pathname === '/' ? window.location.reload() : navigate('/'))

  return (
    <MainBtn className='asideBar__logo' onClick={handleClick}>
      Tasks Book
    </MainBtn>
  )
}

export default Logo
