import React, { useContext } from 'react'
import { Context } from '../../context'
import { database } from '../../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import Input from '../../Components/UI/Input/Input'
import MainBtn from '../../Components/UI/MainBtn/MainBtn'
import './profile.scss'

const Profile = ({ darkMode }) => {
  const { userInfo, setUserInfo, userId, tabItems } = useContext(Context)
  const navigate = useNavigate()

  const styleObj = {
    avatarInput: {
      width: 0,
      height: 0,
      fontSize: 0,
    },
    input: {
      width: '540px',
      padding: '10px',
      background: 'f9f9f9',
      fontSize: '20px',
      border: '1px solid grey',
    },
    btnStyles: {
      marginTop: '20px',
      padding: '10px 25px',
      borderRadius: '8px',
      backgroundColor: '#29a19c',
      fontSize: '18px',
      color: '#fafafa',
    },
  }

  const chooseFile = e => {
    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onload = () => setUserInfo({ ...userInfo, photo: reader.result })
    reader.readAsDataURL(file)
  }

  const sendUserInfo = () => {
    navigate('/')
    database.writeUserData(userId, userInfo, tabItems)
  }

  return (
    <div className={darkMode ? 'profile darkMode' : 'profile'}>
      <div className='profile__container'>
        <form className='profile__form'>
          <div className='profile__avatar'>
            <img className='profile__avatar-img ' src={userInfo.photo} alt='avatar' />
            <Input
              type='file'
              id='avatar'
              style={styleObj.avatarInput}
              onChange={chooseFile}
            />
            <label htmlFor='avatar' className='avatar__label'>
              edit the photo
            </label>
          </div>

          <div className='profile__inputsContainer'>
            <div className='profile__nickname'>
              <label htmlFor='nickname' className='profile__label'>
                Your nickname
              </label>
              <Input
                type='text'
                id='nickname'
                style={styleObj.input}
                value={userInfo.nick}
                onChange={e => setUserInfo({ ...userInfo, nick: e.target.value })}
              />
            </div>
            <div className='profile__email'>
              <label htmlFor='email' className='profile__label'>
                Your email
              </label>
              <Input
                type='email'
                id='email'
                style={styleObj.input}
                value={userInfo.email}
                onChange={e => setUserInfo({ ...userInfo, email: e.target.value })}
                readOnly
              />
            </div>
            <MainBtn type='submit' styles={styleObj.btnStyles} onClick={sendUserInfo}>
              save changes
            </MainBtn>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
