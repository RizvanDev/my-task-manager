import React from 'react'
import { Link } from 'react-router-dom'
import './logo.scss'

const Logo = () => {
  return (
    <div>
      <Link to='/' className='asideBar__logo'>
        Tasks Book
      </Link>
    </div>
  )
}

export default Logo
