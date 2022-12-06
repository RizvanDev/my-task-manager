import React, { forwardRef } from 'react'
import Input from '../../Components/UI/Input/Input'
import MainBtn from '../../Components/UI/MainBtn/MainBtn'
import useValue from '../../hooks/useValue'

const Login = forwardRef(({ inputStyles, btnStyles }, ref) => {
  const [login, setLogin] = useValue({ Email: '', Password: '' })

  return (
    <form className='auth__form'>
      <Input
        style={inputStyles}
        placeholder='E-mail'
        type='email'
        value={login.Email}
        onChange={e => setLogin({ ...login, Email: e.target.value })}
        required
        ref={ref}
      />
      <Input
        style={inputStyles}
        placeholder='Password'
        type='password'
        value={login.Password}
        onChange={e => setLogin({ ...login, Password: e.target.value })}
        minLength={6}
        required
      />
      <MainBtn type='submit' styles={btnStyles}>
        Entrance
      </MainBtn>
    </form>
  )
})

export default Login
