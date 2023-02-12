import './myModal.scss'

const MyModal = ({ opened, darkMode, closeModal, children }) => {
  return (
    <div className={opened ? 'modal open' : 'modal'} onClick={closeModal}>
      <div
        className={darkMode ? 'modal__content darkMode' : 'modal__content'}
        onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default MyModal
