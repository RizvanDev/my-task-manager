import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context'
import { database } from '../../firebase/firebaseConfig'
import Input from '../../Components/UI/Input/Input'
import MainBtn from '../../Components/UI/MainBtn/MainBtn'
import './profile.scss'

const Profile = ({ darkMode }) => {
  const { userInfo, setUserInfo } = useContext(Context)
  const navigate = useNavigate()

  const chooseFile = e => {
    const reader = new FileReader()
    const file = e.target.files[0]

    reader.onload = () => setUserInfo({ ...userInfo, photo: reader.result })
    reader.readAsDataURL(file)
  }

  const sendUserInfo = () => {
    database.writeUserInfoData(userInfo)
    navigate('/')
  }

  const styleObj = {
    btnStyles: {
      marginTop: '20px',
      padding: '10px 25px',
      borderRadius: '8px',
      backgroundColor: '#29a19c',
      fontSize: '18px',
      color: '#fafafa',
    },
  }

  return (
    <div className={darkMode ? 'profile darkMode' : 'profile'}>
      <div className='profile__container'>
        <form className='profile__form'>
          <div className='profile__avatar'>
            <img className='profile__avatar-img ' src={userInfo.photo} alt='avatar' />
            <Input
              className='profile__avatarInput'
              type='file'
              id='avatar'
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
                className='profile__input'
                type='text'
                id='nickname'
                value={userInfo.nick}
                onChange={e => setUserInfo({ ...userInfo, nick: e.target.value })}
              />
            </div>
            <div className='profile__email'>
              <label htmlFor='email' className='profile__label'>
                Your email
              </label>
              <Input
                className='profile__input'
                type='email'
                id='email'
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
