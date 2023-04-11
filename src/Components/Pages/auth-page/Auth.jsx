import { useContext } from 'react'
import { Context } from '../../../context'
import useValue from '../../../hooks/useValue'
import MyTitle from '../../UI/MyTitle/MyTitle'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import cl from './Auth.module.scss'

const Auth = () => {
  const [loginFrom, setLoginForm] = useValue('Login')

  const {
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

  return (
    <div className={cl.auth}>
      <div className={cl.logo}>Tasks Book</div>
      <div className={cl.main}>
        <div className={cl.formContainer}>
          <MyTitle fontSize='18px' lineHeight='25px' letterSpacing='0.02em' textAlign='center'>
            {loginFrom ? 'Log in to your account' : 'Create new account'}
          </MyTitle>

          {loginFrom ? (
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
            />
          ) : (
            <RegistrationForm
              modals={modals}
              openModals={openModals}
              createAuthInfoModal={createAuthInfoModal}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              tabItems={tabItems}
            />
          )}

          <div className={cl.helperText}>
            <span>Don't you have an account yet?</span>
            <div type='button' className={cl.changeForm} onClick={() => setLoginForm(!loginFrom)}>
              {loginFrom ? 'Registration' : 'Login'}
            </div>
          </div>
        </div>
      </div>

      <div className={cl.rights}>&copy; copyright 2023</div>
    </div>
  )
}

export default Auth
