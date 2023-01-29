import React, { useContext } from 'react'
import { Context } from '../../../../context'
import MyModal from '../../../../Components/UI/MyModal/MyModal'

const Statistics = () => {
  const { darkMode, modals, openModals } = useContext(Context)

  const modalStyles = {
    modal: {
      backgroundColor: '#0007',
      transition: 'all .0.2s ease 0s',
    },
    modalContainer: {
      maxWidth: '700px',
      padding: '20px',
      borderRadius: '10px',
      transition: 'all 0.5s ease 0.1s',
    },
  }

  if (window.innerWidth <= 767) {
    modalStyles.modalContainer.maxWidth = '330px'
    modalStyles.modalContainer.padding = '15px'
    modalStyles.modalContainer.borderRadius = '8px'
  }

  if (window.innerWidth <= 414) {
    modalStyles.modalContainer.maxWidth = '290px'
    modalStyles.modalContainer.padding = '10px'
  }

  return (
    <MyModal
      styles={modalStyles}
      darkMode={darkMode}
      opened={modals.statisticsModal}
      closeModal={() => openModals({ ...modals, statisticsModal: false })}>
      Statistics
    </MyModal>
  )
}

export default Statistics
