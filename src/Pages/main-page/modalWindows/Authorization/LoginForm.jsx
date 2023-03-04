import { forwardRef } from 'react'
import { authentication } from '../../../../firebase/firebaseConfig'
import Input from '../../../../Components/UI/Input/Input'
import MainBtn from '../../../../Components/UI/MainBtn/MainBtn'
import useValue from '../../../../hooks/useValue'

const LoginForm = forwardRef(({ ...props }, ref) => {
  const [login, setLogin] = useValue({ Email: '', Password: '' })
  const [showPass, setShowPass] = useValue(false)

  const getLogin = e => {
    e.preventDefault()
    authentication.loginEmailPassword({ login, setLogin, ...props })
  }

  return (
    <form className='auth__form' onSubmit={getLogin}>
      <Input
        className='auth__input'
        placeholder='E-mail'
        type='email'
        value={login.Email}
        onChange={e => setLogin({ ...login, Email: e.target.value })}
        required
        ref={ref}
      />

      <div className='inputPass__container'>
        <Input
          className='auth__input'
          placeholder='Password'
          type={showPass ? 'text' : 'password'}
          value={login.Password}
          onChange={e => setLogin({ ...login, Password: e.target.value })}
          minLength={6}
          required
        />

        <button type='button' className='inputPass__showBtn' onClick={() => setShowPass(!showPass)}>
          {showPass ? <span>&#128269;</span> : <span>&#128270;</span>}
        </button>
      </div>

      <MainBtn className='auth__btn' type='submit' disabled={!login.Email || !login.Password}>
        Entrance
      </MainBtn>
    </form>
  )
})

export default LoginForm
