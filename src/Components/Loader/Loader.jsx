import React, { useRef } from 'react'
import { Transition } from 'react-transition-group'
import './loader.scss'

const Loader = ({ tabLoader }) => {
  const nodeRef = useRef(null)

  return (
    <Transition nodeRef={nodeRef} in={tabLoader} timeout={100} mountOnEnter unmountOnExit>
      {state => (
        <div className={`loader ${state}`} ref={nodeRef}>
          <div className='loader__circle'></div>
        </div>
      )}
    </Transition>
  )
}

export default Loader
