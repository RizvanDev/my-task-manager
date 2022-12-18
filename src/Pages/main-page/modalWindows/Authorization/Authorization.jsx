import React, { useEffect, useRef, useContext } from 'react'
import { Context } from '../../../../context'
import useValue from '../../../../hooks/useValue'
import MyModal from '../../../../Components/UI/MyModal/MyModal'
import MyTitle from '../../../../Components/MyTitle/MyTitle'
import Login from './Login'
import Registration from './Registration'
import InfoAuthModal from '../InfoAuthModal/InfoAuthModal'

import './authorization.scss'

const Authorization = () => {
  const [authType, setAuthType] = useValue('Login')

  const [authInfoModal, createAuthInfoModal] = useValue({
    modal: false,
    type: '',
    text: '',
  })

  const {
    darkMode,
    authModal,
    setAuthModal,
    userInfo,
    setUserInfo,
    tabItems,
    setTabItem,
    setTab,
    setCategory,
  } = useContext(Context)

  const inputRef = useRef(null)

  const chooseAuthType = () => {
    return authType === 'Login' ? setAuthType('Registration') : setAuthType('Login')
  }

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus()
    }, 500)
  }, [authModal, authType])

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
      letterSpacing: '0.03em',
      color: '#0009',
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
      {authInfoModal.modal ? (
        <InfoAuthModal
          authInfoModal={authInfoModal}
          createAuthInfoModal={createAuthInfoModal}
        />
      ) : (
        ''
      )}
      <MyTitle
        fontSize='18px'
        lineHeight='25px'
        letterSpacing='0.02em'
        textAlign='center'>
        {authType === 'Login' ? 'Log in to your account' : 'Create new account'}
      </MyTitle>

      {authType === 'Registration' ? (
        <Registration
          inputStyles={styleObj.inputStyles}
          btnStyles={styleObj.btnStyles}
          setAuthModal={setAuthModal}
          createAuthInfoModal={createAuthInfoModal}
          userInfo={userInfo}
          tabItems={tabItems}
          ref={inputRef}
        />
      ) : (
        <Login
          inputStyles={styleObj.inputStyles}
          btnStyles={styleObj.btnStyles}
          setAuthModal={setAuthModal}
          createAuthInfoModal={createAuthInfoModal}
          setUserInfo={setUserInfo}
          setTabItem={setTabItem}
          setTab={setTab}
          setCategory={setCategory}
          ref={inputRef}
        />
      )}

      <div className='auth__acc'>
        <span>Don't you have an account yet?</span>
        <button type='button' className='auth__acc-btn' onClick={chooseAuthType}>
          {authType === 'Login' ? 'Registration' : 'Login'}
        </button>
      </div>
    </MyModal>
  )
}

export default Authorization
