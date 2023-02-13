import { useContext } from 'react'
import { Context } from '../../../../context'
import MyModal from '../../../../Components/UI/MyModal/MyModal'
import MainBtn from '../../../../Components/UI/MainBtn/MainBtn'

const DeleteModal = ({ removeCategory }) => {
  const { darkMode, modals, openModals, tab } = useContext(Context)

  const closeTaskModal = () => openModals({ ...modals, deleteCategoryModal: false })

  const deleteCategory = () => {
    removeCategory()
    closeTaskModal()
  }

  const styleObj = {
    title: {
      display: 'block',
      margin: '0 0 20px 0',
      textAlign: 'center',
      fontSize: '20px',
      lineHeight: '20px',
    },
    btnContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      columnGap: '25px',
    },
    btnStyles: {
      padding: '10px 25px',
      backgroundColor: 'transparent',
      border: '1px solid  #29a19c',
      borderRadius: '8px',
      fontSize: '16px',
    },
  }

  if (window.matchMedia('(max-width: 768px)').matches) {
    styleObj.title.fontSize = '16px'
  }

  return (
    <MyModal
      darkMode={darkMode}
      opened={modals.deleteCategoryModal}
      closeModal={closeTaskModal}>
      <span style={styleObj.title}>delete {tab} category?</span>
      <div style={styleObj.btnContainer}>
        <MainBtn type='button' styles={styleObj.btnStyles} onClick={deleteCategory}>
          Yes
        </MainBtn>
        <MainBtn type='button' styles={styleObj.btnStyles} onClick={closeTaskModal}>
          No
        </MainBtn>
      </div>
    </MyModal>
  )
}

export default DeleteModal
