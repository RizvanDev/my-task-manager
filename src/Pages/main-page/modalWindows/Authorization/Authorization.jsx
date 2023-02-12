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
