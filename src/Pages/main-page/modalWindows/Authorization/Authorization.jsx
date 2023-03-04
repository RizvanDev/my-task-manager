import { useEffect, useRef, useContext } from 'react'
import { Context } from '../../../../context'
import useValue from '../../../../hooks/useValue'
import MyModal from '../../../../Components/UI/MyModal/MyModal'
import MyTitle from '../../../../Components/MyTitle/MyTitle'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import './authorization.scss'

const Authorization = () => {
  const [authType, setAuthType] = useValue('Login')

  const {
    darkMode,
    modals,
    openModals,
    createAuthInfoModal,
    userInfo,
    setUserInfo,
    tabItems,
    setTabItems,
    setTab,
    setCategory,
  } = useContext(Context)

  const inputRef = useRef(null)

  useEffect(() => {
    setTimeout(() => inputRef.current.focus(), 500)
  }, [modals.authModal, authType])

  return (
    <MyModal
      darkMode={darkMode}
      opened={modals.authModal}
      closeModal={() => openModals({ ...modals, authModal: false })}>
      <MyTitle fontSize='18px' lineHeight='25px' letterSpacing='0.02em' textAlign='center'>
        {authType === 'Login' ? 'Log in to your account' : 'Create new account'}
      </MyTitle>

      {authType === 'Registration' ? (
        <RegistrationForm
          modals={modals}
          openModals={openModals}
          createAuthInfoModal={createAuthInfoModal}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          tabItems={tabItems}
          ref={inputRef}
        />
      ) : (
        <LoginForm
          modals={modals}
          openModals={openModals}
          createAuthInfoModal={createAuthInfoModal}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          tabItems={tabItems}
          setTabItems={setTabItems}
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
