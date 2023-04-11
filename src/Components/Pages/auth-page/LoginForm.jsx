import { authentication } from '../../../firebase/firebaseConfig'
import Input from '../../UI/Input/Input'
import MainBtn from '../../UI/MainBtn/MainBtn'
import useValue from '../../../hooks/useValue'
import cl from './Auth.module.scss'

const LoginForm = props => {
  const [login, setLogin] = useValue({ Email: '', Password: '' })
  const [showPass, setShowPass] = useValue(false)

  const getLogin = e => {
    e.preventDefault()
    authentication.loginEmailPassword({ login, setLogin, ...props })
  }

  return (
    <form className={cl.form} onSubmit={getLogin}>
      <Input
        className={cl.input}
        placeholder='E-mail'
        type='email'
        value={login.Email}
        onChange={e => setLogin({ ...login, Email: e.target.value })}
        required
      />

      <div className={cl.inputPass__container}>
        <Input
          className={cl.input}
          placeholder='Password'
          type={showPass ? 'text' : 'password'}
          value={login.Password}
          onChange={e => setLogin({ ...login, Password: e.target.value })}
          minLength={6}
          required
        />

        {login.Password && (
          <MainBtn type='button' className={cl.showPass} onClick={() => setShowPass(!showPass)}>
            {showPass ? <span> &#128269;</span> : <span>&#128270;</span>}
          </MainBtn>
        )}
      </div>

      <MainBtn className={cl.btn} type='submit' disabled={!login.Email || !login.Password}>
        Entrance
      </MainBtn>
    </form>
  )
}

export default LoginForm
