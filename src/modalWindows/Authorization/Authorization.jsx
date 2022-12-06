import React, { useContext } from 'react'
import './authorization.scss'
import MyModal from '../../Components/UI/MyModal/MyModal'
import MyTitle from '../../Components/MyTitle/MyTitle'
import Login from './Login'
import Registration from './Registration'
import { Context } from '../../context'
import useValue from '../../hooks/useValue'
import { useRef } from 'react'
import { useEffect } from 'react'

const Authorization = () => {
  const [registration, setRegistration] = useValue(false)
  const { darkMode, authModal, setAuthModal } = useContext(Context)
  const inputRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus()
    }, 500)
  }, [authModal, registration])

  const styleObj = {
    modalStyles: {
      modal: {
        backgroundColor: '#0007',
        transition: 'all .0.2s ease 0s',
      },
      modalContainer: {
        maxWidth: '700px',
        padding: '20px',
        borderRadius: '10px',
        transition: 'all 0.5s ease 0.1s',
      },
    },
    inputStyles: {
      width: '310px',
      padding: '10px 15px',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '19px',
      letterSpacing: '0.02em',
      color: '#0007',
    },
    btnStyles: {
      padding: '10px 25px',
      borderRadius: '8px',
      backgroundColor: '#29A19C',
      fontSize: '16px',
      lineHeight: '22px',
      letterSpacing: '0.01em',
      color: '#FAFAFA',
    },
  }

  return (
    <MyModal
      styles={styleObj.modalStyles}
      darkMode={darkMode}
      opened={authModal}
      closeModal={() => setAuthModal(false)}>
      <MyTitle
        fontSize='18px'
        lineHeight='25px'
        letterSpacing='0.02em'
        textAlign='center'>
        {registration ? 'Registration' : 'Log in to your account'}
      </MyTitle>

      {registration ? (
        <Registration
          inputStyles={styleObj.inputStyles}
          btnStyles={styleObj.btnStyles}
          ref={inputRef}
        />
      ) : (
        <Login
          inputStyles={styleObj.inputStyles}
          btnStyles={styleObj.btnStyles}
          ref={inputRef}
        />
      )}

      <div className='auth__acc'>
        <span>Don't you have an account yet?</span>
        <button
          type='button'
          className='auth__acc-btn'
          onClick={() => setRegistration(!registration)}>
          {registration ? 'Login' : 'Registration'}
        </button>
      </div>
    </MyModal>
  )
}

export default Authorization
