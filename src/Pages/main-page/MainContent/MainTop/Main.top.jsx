import { useContext } from 'react'
import { Context } from '../../../../context'
import useValue from '../../../../hooks/useValue'
import MainBtn from '../../../../Components/UI/MainBtn/MainBtn'
import UserMenu from './UserMenu/UserMenu'
import UserModal from './UserModal/UserModal'
import './mainTop.scss'

const MainTop = () => {
  const [userModal, setUserModal] = useValue(false)

  const { tabItems, darkMode, setDarkMode, modals, openModals, userInfo, timeLine } =
    useContext(Context)

  const btnStyles = {
    padding: '10px 25px',
    background: '#29a19c',
    color: '#fafafa',
    columnGap: '10px',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: '0.01em',
    visibility: tabItems.tasks.length && !timeLine.past ? 'visible' : 'hidden',
  }

  if (window.matchMedia('(max-width: 768px)').matches) {
    btnStyles.padding = '12px 30px'
  }

  return (
    <div className='mainContent__top'>
      <MainBtn
        type='button'
        styles={btnStyles}
        onClick={() => openModals({ ...modals, taskModal: true })}>
        <svg width='20' height='20' fill='none'>
          <path
            d='M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z'
            stroke='#FAFAFA'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10 6.3999V13.5999'
            stroke='#FAFAFA'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M6.40002 10H13.6'
            stroke='#FAFAFA'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        {window.matchMedia('(min-width: 768px)').matches && <span>New task</span>}
      </MainBtn>

      <div>
        {darkMode ? (
          <svg width='20' height='20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M19 10.79C18.8427 12.4922 18.2039 14.1144 17.1582 15.4668C16.1126 16.8192 14.7035 17.8458 13.0957 18.4265C11.4879 19.0073 9.74798 19.1181 8.0795 18.7461C6.41102 18.3741 4.88299 17.5345 3.67423 16.3258C2.46546 15.117 1.62594 13.589 1.25391 11.9205C0.881876 10.252 0.992717 8.51208 1.57346 6.9043C2.1542 5.29651 3.18083 3.88737 4.53321 2.84175C5.8856 1.79614 7.5078 1.15731 9.21 1C8.21341 2.34827 7.73385 4.00945 7.85853 5.68141C7.98322 7.35338 8.70386 8.92506 9.8894 10.1106C11.0749 11.2961 12.6466 12.0168 14.3186 12.1415C15.9906 12.2662 17.6517 11.7866 19 10.79V10.79Z'
              stroke='#fff'
              strokeWidth='1'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        ) : (
          <svg width='25' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M12.5 17C15.2614 17 17.5 14.7614 17.5 12C17.5 9.23858 15.2614 7 12.5 7C9.73858 7 7.5 9.23858 7.5 12C7.5 14.7614 9.73858 17 12.5 17Z'
              stroke='#282846'
              strokeWidth='1'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M12.5 1V3'
              stroke='#282846'
              strokeWidth='1'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M12.5 21V23'
              stroke='#282846'
              strokeWidth='1'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M4.72 4.21997L6.14 5.63997'
              stroke='#282846'
              strokeWidth='1'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M18.86 18.3601L20.28 19.7801'
              stroke='#282846'
              strokeWidth='1'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M1.5 12H3.5'
              stroke='#282846'
              strokeWidth='1'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M21.5 12H23.5'
              stroke='#282846'
              strokeWidth='1'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M4.72 19.7801L6.14 18.3601'
              stroke='#282846'
              strokeWidth='1'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M18.86 5.63997L20.28 4.21997'
              stroke='#282846'
              strokeWidth='1'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        )}
      </div>

      <UserMenu
        darkMode={darkMode}
        userModal={userModal}
        setUserModal={setUserModal}
        userInfo={userInfo}
      />
      <UserModal
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        userModal={userModal}
        modals={modals}
        openModals={openModals}
        userInfo={userInfo}
      />
    </div>
  )
}

export default MainTop
