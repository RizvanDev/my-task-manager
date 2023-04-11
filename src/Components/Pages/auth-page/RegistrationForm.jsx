import { useNavigate } from 'react-router-dom'
import { authentication } from '../../../firebase/firebaseConfig'
import useValue from '../../../hooks/useValue'
import Input from '../../UI/Input/Input'
import MainBtn from '../../UI/MainBtn/MainBtn'
import cl from './Auth.module.scss'

const RegistrationForm = props => {
  const [registration, setRegistration] = useValue({ Email: '', Password: '' })
  const [showPass, setShowPass] = useValue(false)
  const navigate = useNavigate()

  const getRegistration = e => {
    e.preventDefault()

    authentication.registrationEmailPassword({
      registration,
      setRegistration,
      navigate,
      ...props,
    })
  }

  return (
    <form className={cl.form} onSubmit={getRegistration}>
      <Input
        className={cl.input}
        placeholder='E-mail'
        type='email'
        value={registration.Email}
        onChange={e => setRegistration({ ...registration, Email: e.target.value })}
        required
      />
      <div className={cl.inputPass__container}>
        <Input
          className={cl.input}
          placeholder='Create password'
          type={showPass ? 'text' : 'password'}
          value={registration.Password}
          onChange={e => setRegistration({ ...registration, Password: e.target.value })}
          minLength={6}
          required
        />

        {registration.Password && (
          <MainBtn type='button' className={cl.showPass} onClick={() => setShowPass(!showPass)}>
            {showPass ? <span> &#128269;</span> : <span>&#128270;</span>}
          </MainBtn>
        )}
      </div>

      <MainBtn
        className={cl.btn}
        type='submit'
        disabled={!registration.Email || !registration.Password}>
        Create account
      </MainBtn>
    </form>
  )
}

export default RegistrationForm
