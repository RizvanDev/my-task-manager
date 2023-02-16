import './userMenu.scss'

const UserMenu = ({ darkMode, userModal, setUserModal, userInfo }) => {
  return (
    <button type='button' className='userMenu__container' onClick={() => setUserModal(!userModal)}>
      {window.matchMedia('(min-width: 768px)').matches && (
        <span className={darkMode ? 'userMenu__name darkModeText' : 'userMenu__name'}>
          {userInfo.nick}
        </span>
      )}

      <img className='userMenu__avatar' src={userInfo.photo} alt='avatar' />

      <div className={darkMode ? 'userMenu__icon darkModeBtn' : 'userMenu__icon'}>
        <svg className={userModal ? 'rotate' : ''} width='14' height='8' fill='none'>
          <path
            d='M1 1L7 7L13 1'
            stroke='#29A19C'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    </button>
  )
}

export default UserMenu
