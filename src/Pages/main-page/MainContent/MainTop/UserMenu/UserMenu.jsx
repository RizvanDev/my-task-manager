import MainBtn from '../../../../../Components/UI/MainBtn/MainBtn'
import './userMenu.scss'

const UserMenu = ({ darkMode, userModal, setUserModal, userInfo }) => {
  return (
    <MainBtn className='userMenu__container' type='button' onClick={() => setUserModal(!userModal)}>
      {window.matchMedia('(min-width: 768px)').matches && (
        <span className='userMenu__name'>{userInfo.nick}</span>
      )}

      <img className='userMenu__avatar' src={userInfo.photo} alt='avatar' />

      <div className={darkMode ? 'userMenu__icon darkMode' : 'userMenu__icon'}>
        <svg className={`${userModal && 'rotate'}`} width='14' height='8' fill='none'>
          <path
            d='M1 1L7 7L13 1'
            stroke='#29A19C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    </MainBtn>
  )
}

export default UserMenu
