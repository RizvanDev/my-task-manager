import React, { forwardRef } from 'react'
import Input from '../../Components/UI/Input/Input'
import MainBtn from '../../Components/UI/MainBtn/MainBtn'
import useValue from '../../hooks/useValue'

const Registration = forwardRef(({ inputStyles, btnStyles }, ref) => {
  const [registration, setRegistration] = useValue({ Email: '', Password: '' })

  return (
    <form className='auth__form'>
      <Input
        style={inputStyles}
        placeholder='E-mail'
        type='email'
        value={registration.Email}
        onChange={e => setRegistration({ ...registration, Email: e.target.value })}
        required
        ref={ref}
      />
      <Input
        style={inputStyles}
        placeholder='Create password'
        type='password'
        value={registration.Password}
        onChange={e => setRegistration({ ...registration, Password: e.target.value })}
        minLength={6}
        required
      />
      <MainBtn type='submit' styles={btnStyles}>
        Create account
      </MainBtn>
    </form>
  )
})

export default Registration
