import React, { forwardRef } from 'react'
import { authentication } from '../../../../firebase/firebaseConfig'
import Input from '../../../../Components/UI/Input/Input'
import MainBtn from '../../../../Components/UI/MainBtn/MainBtn'
import useValue from '../../../../hooks/useValue'
import { useNavigate } from 'react-router-dom'

const Registration = forwardRef(({ ...props }, ref) => {
  const [registration, setRegistration] = useValue({ Email: '', Password: '' })
  const [showPass, setShowPass] = useValue(false)
  const navigate = useNavigate()

  const getRegistration = e => {
    e.preventDefault()

    return authentication.registrationEmailPassword({
      registration,
      setRegistration,
      navigate,
      setAuthorization: props.setAuthorization,
      userInfo: props.userInfo,
      setUserInfo: props.setUserInfo,
      tabItems: props.tabItems,
      modals: props.modals,
      openModals: props.openModals,
      createAuthInfoModal: props.createAuthInfoModal,
    })
  }

  return (
    <form className='auth__form'>
      <Input
        style={props.inputStyles}
        placeholder='E-mail'
        type='email'
        value={registration.Email}
        onChange={e => setRegistration({ ...registration, Email: e.target.value })}
        required
        ref={ref}
      />
      <div className='inputPass__container'>
        <Input
          style={props.inputStyles}
          placeholder='Create password'
          type={showPass ? 'text' : 'password'}
          value={registration.Password}
          onChange={e => setRegistration({ ...registration, Password: e.target.value })}
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

      <MainBtn type='submit' styles={props.btnStyles} onClick={getRegistration}>
        Create account
      </MainBtn>
    </form>
  )
})

export default Registration
