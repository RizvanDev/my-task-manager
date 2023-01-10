import React, { forwardRef } from 'react'
import { authentication } from '../../../../firebase/firebaseConfig'
import Input from '../../../../Components/UI/Input/Input'
import MainBtn from '../../../../Components/UI/MainBtn/MainBtn'
import useValue from '../../../../hooks/useValue'

const Login = forwardRef(({ ...props }, ref) => {
  const [login, setLogin] = useValue({ Email: '', Password: '' })
  const [showPass, setShowPass] = useValue(false)

  const getLogin = e => {
    e.preventDefault()

    return authentication.loginEmailPassword({
      login,
      setLogin,
      setAuthorization: props.setAuthorization,
      userInfo: props.userInfo,
      setUserInfo: props.setUserInfo,
      tabItems: props.tabItems,
      setTabItem: props.setTabItem,
      setTab: props.setTab,
      setCategory: props.setCategory,
      setAuthModal: props.setAuthModal,
      createAuthInfoModal: props.createAuthInfoModal,
    })
  }

  return (
    <form className='auth__form'>
      <Input
        style={props.inputStyles}
        placeholder='E-mail'
        type='email'
        value={login.Email}
        onChange={e => setLogin({ ...login, Email: e.target.value })}
        required
        ref={ref}
      />

      <div className='inputPass__container'>
        <Input
          style={props.inputStyles}
          placeholder='Password'
          type={showPass ? 'text' : 'password'}
          value={login.Password}
          onChange={e => setLogin({ ...login, Password: e.target.value })}
          minLength={6}
          required
        />
        <button
          type='button'
          className='inputPass__showBtn'
          onClick={() => setShowPass(!showPass)}>
          {showPass ? <span>&#128269;</span> : <span>&#128270;</span>}
        </button>
      </div>

      <MainBtn type='submit' styles={props.btnStyles} onClick={getLogin}>
        Entrance
      </MainBtn>
    </form>
  )
})

export default Login
