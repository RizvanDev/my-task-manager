import React from 'react'
import moon from '../../assets/icons/mode/moon.png'
import sun from '../../assets/icons/mode/sun.png'

const ModeBtn = ({ darkMode }) => {
  return (
    <div>
      <img src={darkMode ? sun : moon} width='26px' height='26px' alt='mode' />
    </div>
  )
}

export default ModeBtn
