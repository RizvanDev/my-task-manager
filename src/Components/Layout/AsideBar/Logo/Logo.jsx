import { Link } from 'react-router-dom'
import './logo.scss'

const Logo = () => {
  return (
    <Link to='/' className='asideBar__logo'>
      Tasks Book
    </Link>
  )
}

export default Logo
