import { forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { authentication } from '../../../../../firebase/firebaseConfig'
import useValue from '../../../../../hooks/useValue'
import Input from '../../../../../Components/UI/Input/Input'
import MainBtn from '../../../../../Components/UI/MainBtn/MainBtn'

const RegistrationForm = forwardRef(({ ...props }, ref) => {
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
    <form className='auth__form' onSubmit={getRegistration}>
      <Input
        className='auth__input'
        placeholder='E-mail'
        type='email'
        value={registration.Email}
        onChange={e => setRegistration({ ...registration, Email: e.target.value })}
        required
        ref={ref}
      />
      <div className='inputPass__container'>
        <Input
          className='auth__input'
          placeholder='Create password'
          type={showPass ? 'text' : 'password'}
          value={registration.Password}
          onChange={e => setRegistration({ ...registration, Password: e.target.value })}
          minLength={6}
          required
        />
        <button type='button' className='inputPass__showBtn' onClick={() => setShowPass(!showPass)}>
          {showPass ? <span> &#128269;</span> : <span>&#128270;</span>}
        </button>
      </div>

      <MainBtn
        className='auth__btn'
        type='submit'
        disabled={!registration.Email || !registration.Password}>
        Create account
      </MainBtn>
    </form>
  )
})

export default RegistrationForm
