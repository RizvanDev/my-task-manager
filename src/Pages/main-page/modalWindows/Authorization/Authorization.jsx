import React, { useEffect, useRef, useContext } from 'react'
import { Context } from '../../../../context'
import useValue from '../../../../hooks/useValue'
import MyModal from '../../../../Components/UI/MyModal/MyModal'
import MyTitle from '../../../../Components/MyTitle/MyTitle'
import Login from './Login'
import Registration from './Registration'
import './authorization.scss'

const Authorization = () => {
  const [authType, setAuthType] = useValue('Login')

  const {
    darkMode,
    modals,
    openModals,
    setAuthorization,
    createAuthInfoModal,
    userInfo,
    setUserInfo,
    tabItems,
    setTabItem,
    setTab,
    setCategory,
  } = useContext(Context)

  const inputRef = useRef(null)

  useEffect(() => {
    setTimeout(() => inputRef.current.focus(), 500)
  }, [modals.authModal, authType])

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

  if (window.innerWidth <= 767) {
    styleObj.modalStyles.modalContainer.padding = '20px 15px'
    styleObj.inputStyles.width = '275px'
  }

  return (
    <MyModal
      styles={styleObj.modalStyles}
      darkMode={darkMode}
      opened={modals.authModal}
      closeModal={() => openModals({ ...modals, authModal: false })}>
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
          modals={modals}
          openModals={openModals}
          setAuthorization={setAuthorization}
          createAuthInfoModal={createAuthInfoModal}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          tabItems={tabItems}
          ref={inputRef}
        />
      ) : (
        <Login
          inputStyles={styleObj.inputStyles}
          btnStyles={styleObj.btnStyles}
          modals={modals}
          openModals={openModals}
          setAuthorization={setAuthorization}
          createAuthInfoModal={createAuthInfoModal}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          tabItems={tabItems}
          setTabItem={setTabItem}
          setTab={setTab}
          setCategory={setCategory}
          ref={inputRef}
        />
      )}

      <div className='auth__acc'>
        <span>Don't you have an account yet?</span>
        <button
          type='button'
          className='auth__acc-btn'
          onClick={() => setAuthType(authType === 'Login' ? 'Registration' : 'Login')}>
          {authType === 'Login' ? 'Registration' : 'Login'}
        </button>
      </div>
    </MyModal>
  )
}

export default Authorization
